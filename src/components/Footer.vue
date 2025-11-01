<template>
  <footer class="bg-gray-900 mt-auto">
    <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand Column -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <svg class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <span class="text-xl font-bold text-white">C2CEO</span>
          </div>
          <p class="text-gray-400 text-sm max-w-md leading-relaxed">
            Empowering creators to become CEOs through premium courses and expert-led instruction. 
            Transform your skills, advance your career, and achieve your entrepreneurial dreams.
          </p>
          <div class="mt-6 flex space-x-4">
            <a href="#" class="social-link" aria-label="Twitter">
              <span class="sr-only">Twitter</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="YouTube">
              <span class="sr-only">YouTube</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                <path fill-rule="evenodd" d="M12.93 5.343l-8.56 3.036a1 1 0 00.123 1.96L7.94 11l.694 3.661a1 1 0 001.96-.123l3.036-8.56a1 1 0 00-1.27-1.27z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h3>
          <ul class="space-y-3">
            <li><a href="/#features" class="footer-link">Features</a></li>
            <li><a href="/#stats" class="footer-link">About Us</a></li>
            <li><a href="/#pricing" class="footer-link">Get Started</a></li>
          </ul>
        </div>
        
        <!-- Support -->
        <div>
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
          <ul class="space-y-3">
            <li><a href="#" class="footer-link">Help Center</a></li>
            <li><a href="#" class="footer-link">Contact Us</a></li>
            <li><a href="#" class="footer-link">Privacy Policy</a></li>
            <li><a href="#" class="footer-link">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <!-- Bottom Border and Copyright -->
      <div class="mt-12 pt-8 border-t border-gray-800">
        <p class="text-xs leading-5 text-gray-400 text-center">
          &copy; 2025 C2CEO - Creator to CEO Learning Platform. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.social-link {
  display: inline-flex;
  padding: 10px;
  color: #9ca3af;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s;
}

.social-link:hover {
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.1);
  transform: translateY(-2px);
}

.footer-link {
  color: #9ca3af;
  font-size: 0.875rem;
  transition: color 0.3s;
}

.footer-link:hover {
  color: white;
}
</style>
