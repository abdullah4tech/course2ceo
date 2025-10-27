# Course Management Platform - README

A comprehensive course management web application built with React, Supabase, and Tailwind CSS. Users must authenticate via Google OAuth to view courses, and admins manually grant access after payment verification.

## 🚀 Features Completed

### ✅ Authentication & Authorization
- Google OAuth integration via Supabase
- Protected routes for authenticated users
- Admin role-based access control
- Automatic redirect to dashboard after login

### ✅ User Experience
- Landing page with Google sign-in/sign-up buttons
- User dashboard with course grid
- Course status badges (Not Purchased, Pending, Active, Expired)
- Payment modal with admin contact information
- Responsive design for mobile, tablet, and desktop

### ✅ UI Components
- Modern design using Tailwind CSS
- Reusable components: Button, Badge, Modal, Card, Loading states
- Toast notifications for user feedback
- Navigation bar with user dropdown menu
- Accessible components using Headless UI

### ✅ Technical Infrastructure
- React 19+ with Vite for fast development
- TypeScript-ready codebase structure
- Supabase integration for backend services
- React Router DOM for navigation
- Context-based state management
- Responsive grid layouts

## 🛠 Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Authentication**: Google OAuth via Supabase
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form + Zod (ready for future forms)
- **State Management**: React Context API

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx
│   ├── layout/
│   │   └── Navbar.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Badge.jsx
│   │   ├── Modal.jsx
│   │   ├── Card.jsx
│   │   ├── Loading.jsx
│   │   └── Toast.jsx
│   └── index.js
├── context/
│   └── AuthContext.jsx
├── lib/
│   └── supabase.js
├── pages/
│   ├── LandingPage.jsx
│   └── Dashboard.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 🔧 Setup Instructions

### 1. Environment Variables
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_NAME="Course Platform"
VITE_ADMIN_EMAIL="admin@platform.com"
VITE_ADMIN_WHATSAPP="+123456789"
VITE_ADMIN_PHONE="+123456789"
```

### 2. Database Setup
Follow the instructions in `DATABASE_SETUP.md` to:
- Create all required tables in Supabase
- Set up Row Level Security (RLS) policies
- Configure Google OAuth provider
- Create your first admin user

### 3. Install Dependencies
```bash
bun install
# or
npm install
```

### 4. Start Development Server
```bash
bun run dev
# or
npm run dev
```

Visit `http://localhost:5173` to see your application.

## 📋 Next Steps (Remaining TODOs)

### 🔲 Database Schema Setup
- Run SQL commands from `DATABASE_SETUP.md` in your Supabase SQL Editor
- Configure Google OAuth in Supabase Authentication settings
- Create your first admin user

### 🔲 Course Content Pages
- Video player component
- Lesson sidebar navigation
- Progress tracking functionality
- Breadcrumb navigation

### 🔲 Admin Dashboard
- Statistics overview (total users, courses, enrollments)
- User management table with search/filter
- Course management interface
- Access control toggles for granting/revoking course access

### 🔲 Advanced Features
- Real-time updates when admin grants access
- Email notifications (optional)
- Course search and filtering
- Certificate generation upon completion
- Bulk access management
- Data export functionality
- Dark mode toggle

## 🎯 User Flow

1. **Landing Page**: User visits and clicks "Sign Up with Google"
2. **Authentication**: Google OAuth authentication via Supabase
3. **Dashboard**: User sees all courses with "Not Purchased" badges
4. **Payment Process**: Click course → Payment modal → Contact admin
5. **Admin Approval**: Admin grants access manually after payment verification
6. **Course Access**: User refreshes → Badge shows "Active" → Access full content

## 🔐 Security Features

- Protected routes requiring authentication
- Admin-only routes for management functions
- Row Level Security (RLS) policies in Supabase
- Secure course content access control
- Input validation and sanitization

## 📱 Responsive Design

The platform is fully responsive with:
- Mobile-first design approach
- Tablet and desktop optimizations
- Touch-friendly interface elements
- Accessible components for screen readers

## 🚀 Deployment

The application is ready for deployment to platforms like:
- Vercel (recommended for React/Vite apps)
- Netlify
- Any static hosting provider

Make sure to:
1. Set up environment variables in your hosting platform
2. Update Supabase redirect URLs for production
3. Configure your domain in Supabase settings

## 📞 Support

For questions or issues:
- Check the `DATABASE_SETUP.md` for database configuration
- Review the component documentation in source files
- Contact admin via the configured email/WhatsApp in environment variables

## 🎨 Customization

The platform uses a custom color scheme defined in `tailwind.config.js`:
- Primary: Blue shades
- Success: Green shades  
- Warning: Yellow/Orange shades
- Danger: Red shades

Modify these colors to match your brand identity.

---

**Built with ❤️ using React, Supabase, and Tailwind CSS**