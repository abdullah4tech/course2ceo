import { useState } from 'react'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'
import { Button, useToast } from '../components'

const AdminSetup = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const toast = useToast()

  const makeCurrentUserAdmin = async () => {
    if (!user) {
      toast.error('You must be logged in')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: true })
        .eq('id', user.id)

      if (error) throw error

      toast.success('Successfully made you an admin! Please refresh the page.')
      
      // Show the SQL command for reference
      console.log(`Admin SQL executed: UPDATE profiles SET is_admin = true WHERE id = '${user.id}';`)
      
    } catch (error) {
      console.error('Error making user admin:', error)
      toast.error('Failed to make user admin: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const makeUserAdminByEmail = async () => {
    if (!userEmail) {
      toast.error('Please enter an email address')
      return
    }

    setLoading(true)
    try {
      // First get the user by email from auth.users (requires service role)
      // Since we can't access auth.users directly, we'll try to find by email in profiles
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .ilike('full_name', `%${userEmail}%`)

      if (profileError) throw profileError

      if (!profiles || profiles.length === 0) {
        toast.error('User not found. Make sure they have signed up first.')
        return
      }

      // Update the first matching profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_admin: true })
        .eq('id', profiles[0].id)

      if (updateError) throw updateError

      toast.success(`Successfully made ${profiles[0].full_name} an admin!`)
      
    } catch (error) {
      console.error('Error making user admin:', error)
      toast.error('Failed to make user admin: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const getCurrentUserId = () => {
    if (user) {
      // Copy to clipboard
      navigator.clipboard.writeText(user.id)
      toast.success('User ID copied to clipboard!')
      console.log('Current User ID:', user.id)
      console.log('SQL Command:', `UPDATE profiles SET is_admin = true WHERE id = '${user.id}';`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Setup</h2>
        <p className="text-gray-600">Set up admin credentials for your course platform.</p>
      </div>

      {/* Current User Info */}
      {user && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Current User</h3>
          <p className="text-sm text-blue-700 mb-2">Email: {user.email}</p>
          <p className="text-sm text-blue-700 mb-3">ID: {user.id}</p>
          <div className="flex gap-2">
            <Button 
              onClick={getCurrentUserId}
              variant="outline"
              size="sm"
            >
              Copy User ID
            </Button>
            <Button 
              onClick={makeCurrentUserAdmin}
              loading={loading}
              size="sm"
            >
              Make Me Admin
            </Button>
          </div>
        </div>
      )}

      {/* Manual Email Entry */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">Make Another User Admin</h3>
        <p className="text-sm text-gray-600 mb-3">Enter the email of a user who has already signed up</p>
        <div className="flex gap-2">
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="user@example.com"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button 
            onClick={makeUserAdminByEmail}
            loading={loading}
            size="sm"
          >
            Make Admin
          </Button>
        </div>
      </div>

      {/* Manual SQL Instructions */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-900 mb-2">Manual SQL Method</h3>
        <p className="text-sm text-yellow-700 mb-2">
          If the above doesn't work, you can run this SQL command directly in your Supabase SQL Editor:
        </p>
        <code className="block bg-yellow-100 p-2 rounded text-sm font-mono text-yellow-800">
          UPDATE profiles SET is_admin = true WHERE id = 'YOUR_USER_ID_HERE';
        </code>
      </div>
    </div>
  )
}

export default AdminSetup