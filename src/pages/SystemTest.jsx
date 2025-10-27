import { useState } from 'react'
import { Card, Button, useToast } from '../components'
import { supabase } from '../lib/supabase'
import { 
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  WifiIcon,
  CircleStackIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const SystemTest = () => {
  const [testResults, setTestResults] = useState({})
  const [testing, setTesting] = useState(false)
  const toast = useToast()

  const runTest = async (testName, testFunction) => {
    try {
      setTestResults(prev => ({ ...prev, [testName]: { status: 'running' } }))
      const result = await testFunction()
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { status: 'success', message: result } 
      }))
      return true
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { status: 'error', message: error.message } 
      }))
      return false
    }
  }

  const testSupabaseConnection = async () => {
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true })
    if (error) throw error
    return `Connected successfully. Profiles table accessible.`
  }

  const testAuthentication = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      return `User authenticated: ${user.email}`
    } else {
      return 'No user currently authenticated (this is normal for testing)'
    }
  }

  const testDatabase = async () => {
    const tables = ['profiles', 'courses', 'course_access', 'course_lessons']
    const results = []
    
    for (const table of tables) {
      try {
        const { error } = await supabase.from(table).select('count', { count: 'exact', head: true })
        if (error) throw error
        results.push(`${table}: OK`)
      } catch (error) {
        results.push(`${table}: ERROR - ${error.message}`)
      }
    }
    
    return results.join(', ')
  }

  const testEnvironmentVariables = async () => {
    const requiredVars = [
      'VITE_SUPABASE_URL',
      'VITE_SUPABASE_ANON_KEY',
      'VITE_ADMIN_EMAIL',
      'VITE_ADMIN_WHATSAPP'
    ]
    
    const missing = requiredVars.filter(varName => !import.meta.env[varName])
    
    if (missing.length > 0) {
      throw new Error(`Missing environment variables: ${missing.join(', ')}`)
    }
    
    return 'All required environment variables are set'
  }

  const runAllTests = async () => {
    setTesting(true)
    setTestResults({})
    
    try {
      toast.info('Running system tests...')
      
      const tests = [
        ['Environment Variables', testEnvironmentVariables],
        ['Supabase Connection', testSupabaseConnection],
        ['Database Tables', testDatabase],
        ['Authentication', testAuthentication]
      ]
      
      let passedTests = 0
      
      for (const [testName, testFunction] of tests) {
        const passed = await runTest(testName, testFunction)
        if (passed) passedTests++
        // Add small delay between tests
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      
      if (passedTests === tests.length) {
        toast.success('All tests passed! System is ready.')
      } else {
        toast.warning(`${passedTests}/${tests.length} tests passed. Check failed tests.`)
      }
      
    } catch (error) {
      toast.error('Test runner error: ' + error.message)
    } finally {
      setTesting(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-success-500" />
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-danger-500" />
      case 'running':
        return <div className="h-5 w-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success-700 bg-success-50 border-success-200'
      case 'error':
        return 'text-danger-700 bg-danger-50 border-danger-200'
      case 'running':
        return 'text-primary-700 bg-primary-50 border-primary-200'
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">System Tests</h1>
          <p className="text-gray-600 mt-2">
            Test your course platform setup and configuration.
          </p>
        </div>

        {/* Quick Setup Checklist */}
        <Card className="mb-8">
          <Card.Header>
            <h2 className="text-xl font-semibold text-gray-900">Setup Checklist</h2>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CircleStackIcon className="h-5 w-5 text-primary-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Database Setup</h3>
                  <p className="text-sm text-gray-600">
                    Run the SQL commands from <code className="bg-gray-100 px-1 rounded">DATABASE_SETUP.md</code> in your Supabase SQL Editor.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <ShieldCheckIcon className="h-5 w-5 text-primary-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Google OAuth</h3>
                  <p className="text-sm text-gray-600">
                    Configure Google OAuth in your Supabase Authentication settings.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <WifiIcon className="h-5 w-5 text-primary-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Environment Variables</h3>
                  <p className="text-sm text-gray-600">
                    Set up your <code className="bg-gray-100 px-1 rounded">.env</code> file with Supabase credentials.
                  </p>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Test Runner */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Automated Tests</h2>
              <Button 
                onClick={runAllTests} 
                loading={testing}
                disabled={testing}
              >
                {testing ? 'Running Tests...' : 'Run All Tests'}
              </Button>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {[
                'Environment Variables',
                'Supabase Connection', 
                'Database Tables',
                'Authentication'
              ].map((testName) => {
                const result = testResults[testName]
                const status = result?.status || 'pending'
                
                return (
                  <div 
                    key={testName}
                    className={`p-4 rounded-lg border ${getStatusColor(status)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(status)}
                        <span className="font-medium">{testName}</span>
                      </div>
                      <span className="text-xs uppercase font-medium">
                        {status}
                      </span>
                    </div>
                    {result?.message && (
                      <p className="text-sm mt-2 ml-8">
                        {result.message}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </Card.Content>
        </Card>

        {/* Environment Info */}
        <Card className="mt-8">
          <Card.Header>
            <h2 className="text-xl font-semibold text-gray-900">Environment Information</h2>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Supabase URL:</span>
                <p className="text-gray-600 break-all">
                  {import.meta.env.VITE_SUPABASE_URL || 'Not set'}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Admin Email:</span>
                <p className="text-gray-600">
                  {import.meta.env.VITE_ADMIN_EMAIL || 'Not set'}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Admin WhatsApp:</span>
                <p className="text-gray-600">
                  {import.meta.env.VITE_ADMIN_WHATSAPP || 'Not set'}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Environment:</span>
                <p className="text-gray-600">
                  {import.meta.env.MODE || 'Unknown'}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}

export default SystemTest