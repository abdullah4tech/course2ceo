import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { signInWithGoogle } from '../lib/supabase'
import { Button, useToast } from '../components'
import overviewVideo from '../assets/overview.mp4'
import videoBanner from '../assets/video_banner.png'
import { 
  PlayCircleIcon,
  ClockIcon,
  UsersIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  AcademicCapIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const LandingPage = () => {
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, loading, navigate])

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      // Redirect will be handled by Supabase
    } catch (error) {
      console.error('Error signing in:', error)
      toast.error('Failed to sign in. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8" aria-label="Global">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <span className="sr-only">Creator to CEO</span>
              <AcademicCapIcon className="h-6 w-6 text-blue-600 sm:h-7 sm:w-7" />
              <span className="text-base font-bold text-gray-900 sm:text-lg">Creator2CEO</span>
            </a>
          </div>
          
          <div className="hidden md:flex md:gap-x-6 lg:gap-x-8">
            <a href="#features" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#stats" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Results
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Start
            </a>
          </div>
          
          <div className="flex items-center gap-x-2 sm:gap-x-3">
            <Button 
              variant="outline"
              onClick={handleGoogleSignIn}
              size="sm"
              className="hidden sm:inline-flex border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 text-sm lg:px-4"
            >
              Sign In
            </Button>
            <Button 
              onClick={handleGoogleSignIn}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 shadow-sm text-sm lg:px-4"
            >
              Start
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        {/* Subtle background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.100),white)] opacity-20" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:pt-32 sm:pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              From Creator to <span className="text-blue-600">CEO</span>
            </h1>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8 max-w-2xl mx-auto">
              Transform your creative skills into a profitable business with expert-led courses.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Button 
                size="lg"
                onClick={handleGoogleSignIn}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Get Started
              </Button>
              <Button 
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3"
              >
                Sign In
              </Button>
            </div>
          </div>
          
          {/* Hero Video */}
          <div className="mt-12 flow-root sm:mt-16 lg:mt-24">
            <div className="relative rounded-lg bg-gray-900/5 p-1 ring-1 ring-inset ring-gray-900/10 sm:rounded-xl sm:p-2 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="aspect-video rounded-md bg-white shadow-xl ring-1 ring-gray-900/10 overflow-hidden relative group sm:shadow-2xl">
                {/* Banner Image */}
                <img 
                  src={videoBanner}
                  alt="Video Banner"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <video 
                  className="w-full h-full object-cover absolute inset-0 opacity-0"
                  preload="metadata"
                  poster={videoBanner}
                  onLoadedData={(e) => {
                    // Keep video hidden until we want to show it
                  }}
                  onClick={(e) => {
                    const video = e.target;
                    const container = video.parentElement;
                    const overlay = container.querySelector('.absolute');
                    const banner = container.querySelector('img');
                    
                    if (video.paused) {
                      video.play();
                      video.style.opacity = '1';
                      banner.style.opacity = '0';
                      overlay.style.opacity = '0';
                      overlay.style.pointerEvents = 'none';
                    } else {
                      video.pause();
                      // Keep video visible when paused, just show overlay
                      overlay.style.opacity = '1';
                      overlay.style.pointerEvents = 'auto';
                    }
                  }}
                  onEnded={(e) => {
                    const video = e.target;
                    const container = video.parentElement;
                    const overlay = container.querySelector('.absolute');
                    const banner = container.querySelector('img');
                    
                    video.style.opacity = '0';
                    banner.style.opacity = '1';
                    overlay.style.opacity = '1';
                    overlay.style.pointerEvents = 'auto';
                  }}
                >
                  <source src={overviewVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Play/Pause Button Overlay */}
                <div 
                  className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-10 transition-all duration-300 cursor-pointer z-10"
                  onClick={(e) => {
                    const container = e.target.closest('.relative');
                    const video = container.querySelector('video');
                    const overlay = e.currentTarget;
                    const banner = container.querySelector('img');
                    
                    if (video.paused) {
                      video.play();
                      video.style.opacity = '1';
                      banner.style.opacity = '0';
                      overlay.style.opacity = '0';
                      overlay.style.pointerEvents = 'none';
                    } else {
                      video.pause();
                      // Keep video visible when paused, just show overlay
                      overlay.style.opacity = '1';
                      overlay.style.pointerEvents = 'auto';
                    }
                  }}
                >
                  <div className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-6 transition-all duration-300 transform hover:scale-110 shadow-2xl">
                    <PlayCircleIcon className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Why Creator2CEO Works
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg">
              Master business skills designed specifically for creators
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-6 sm:gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
              <div className="flex flex-col text-center lg:text-left">
                <dt className="flex items-center justify-center lg:justify-start gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <ShieldCheckIcon className="h-5 w-5 flex-none text-blue-600" />
                  Business Strategy
                </dt>
                <dd className="mt-3 text-sm leading-6 text-gray-600">
                  <p>
                    Proven frameworks to scale creative work into profitable businesses.
                  </p>
                </dd>
              </div>
              
              <div className="flex flex-col text-center lg:text-left">
                <dt className="flex items-center justify-center lg:justify-start gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <BookOpenIcon className="h-5 w-5 flex-none text-blue-600" />
                  Expert Mentorship
                </dt>
                <dd className="mt-3 text-sm leading-6 text-gray-600">
                  <p>
                    Learn from successful entrepreneurs who built million-dollar businesses.
                  </p>
                </dd>
              </div>
              
                            <div className="flex flex-col text-center lg:text-left">
                <dt className="flex items-center justify-center lg:justify-start gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <ClockIcon className="h-5 w-5 flex-none text-blue-600" />
                  Apply Immediately
                </dt>
                <dd className="mt-3 text-sm leading-6 text-gray-600">
                  <p>
                    Learn and implement simultaneously. See real results as you progress.
                  </p>
                </dd>
              </div>
              
              <div className="flex flex-col text-center lg:text-left">
                <dt className="flex items-center justify-center lg:justify-start gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <PlayCircleIcon className="h-5 w-5 flex-none text-blue-600" />
                  Real Case Studies
                </dt>
                <dd className="mt-3 text-sm leading-6 text-gray-600">
                  <p>
                    Study actual business transformations and revenue strategies.
                  </p>
                </dd>
              </div>
              
              <div className="flex flex-col text-center lg:text-left">
                <dt className="flex items-center justify-center lg:justify-start gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <UsersIcon className="h-5 w-5 flex-none text-blue-600" />
                  CEO Network
                </dt>
                <dd className="mt-3 text-sm leading-6 text-gray-600">
                  <p>
                    Connect with successful creator-entrepreneurs and industry leaders.
                  </p>
                </dd>
              </div>
              
              <div className="flex flex-col text-center lg:text-left">
                <dt className="flex items-center justify-center lg:justify-start gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <CheckCircleIcon className="h-5 w-5 flex-none text-blue-600" />
                  Proven Results
                </dt>
                <dd className="mt-3 text-sm leading-6 text-gray-600">
                  <p>
                    Join creators with 6-figure businesses and entrepreneurial freedom.
                  </p>
                </dd>
              </div>
              
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <PlayCircleIcon className="h-5 w-5 flex-none text-blue-600" />
                  Interactive Experience
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Engaging video lessons, quizzes, and hands-on projects to reinforce your learning experience.
                  </p>
                </dd>
              </div>
              
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <UsersIcon className="h-5 w-5 flex-none text-blue-600" />
                  Community Support
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Connect with fellow learners and get support when you need it most. Learning is better together.
                  </p>
                </dd>
              </div>
              
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <CheckCircleIcon className="h-5 w-5 flex-none text-blue-600" />
                  Proven Results
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Join thousands of successful students who have advanced their careers with our courses.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div id="stats" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                Real Creator Success
              </h2>
              <p className="mt-3 text-base leading-7 text-gray-600 sm:mt-4 sm:text-lg">
                Proven results from our community
              </p>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-0.5 overflow-hidden rounded-xl text-center sm:mt-16 sm:grid-cols-4 lg:rounded-2xl">
              <div className="flex flex-col bg-gray-400/5 p-4 sm:p-6 lg:p-8">
                <dt className="text-xs font-semibold leading-5 text-gray-600 sm:text-sm">Businesses</dt>
                <dd className="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">1,200+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-4 sm:p-6 lg:p-8">
                <dt className="text-xs font-semibold leading-5 text-gray-600 sm:text-sm">Revenue</dt>
                <dd className="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">$50M+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-4 sm:p-6 lg:p-8">
                <dt className="text-xs font-semibold leading-5 text-gray-600 sm:text-sm">CEOs</dt>
                <dd className="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">500+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-4 sm:p-6 lg:p-8">
                <dt className="text-xs font-semibold leading-5 text-gray-600 sm:text-sm">Income ↑</dt>
                <dd className="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">340%</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA + Footer Section */}
      <div id="pricing" className="">
        {/* CTA Content with rounded top corners */}
        <div className="bg-blue-600 rounded-t-3xl sm:rounded-t-[4rem]">
          <div className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Ready to become a Creator-CEO?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-200 sm:mt-6 sm:text-lg">
                Transform your creative passion into a thriving business.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button 
                  size="lg"
                  onClick={handleGoogleSignIn}
                  className="relative inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 shadow-lg border-0 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-blue-600">Get Started Today</span>
                </Button>
              </div>
              <p className="mt-6 text-sm text-blue-200">
                Secure authentication • Manual access verification • No credit card required
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 px-6 py-12 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Column */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <AcademicCapIcon className="h-8 w-8 text-blue-400" />
                  <span className="text-xl font-bold text-white">C2CEO</span>
                </div>
                <p className="text-gray-400 text-sm max-w-md">
                  Empowering creators to become CEOs through premium courses and expert-led instruction. 
                  Transform your skills, advance your career, and achieve your entrepreneurial dreams.
                </p>
                <div className="mt-6 flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <span className="sr-only">YouTube</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                      <path fillRule="evenodd" d="M12.93 5.343l-8.56 3.036a1 1 0 00.123 1.96L7.94 11l.694 3.661a1 1 0 001.96-.123l3.036-8.56a1 1 0 00-1.27-1.27z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                  <li><a href="#stats" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a></li>
                  <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Get Started</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Border and Copyright */}
            <div className="mt-12 border-t border-gray-700 pt-8">
              <p className="text-xs leading-5 text-gray-400 text-center">
                &copy; 2025 C2CEO - Creator to CEO Learning Platform. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage