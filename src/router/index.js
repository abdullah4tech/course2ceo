import { createWebHistory, createRouter } from "vue-router";
import { authService } from "../services/storage";
import CoursesPage from "../pages/CoursesPage.vue";
import HomePage from "../pages/HomePage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import SignInPage from "../pages/SignInPage.vue";
import LoginStudentPage from "../pages/LoginStudentPage.vue";
import LoginAdminPage from "../pages/LoginAdminPage.vue";

// Admin Layout & Pages
import AdminLayout from "../layouts/AdminLayout.vue";
import AdminDashboardPage from "../pages/AdminDashboardPage.vue";
import AdminCoursesPage from "../pages/AdminCoursesPage.vue";
import AdminUsersPage from "../pages/AdminUsersPage.vue";

// User Dashboard Layout & Pages
import UserLayout from "../layouts/UserLayout.vue";
import UserDashboardPage from "../pages/UserDashboardPage.vue";
import UserCoursesPage from "../pages/UserCoursesPage.vue";
import BrowseCoursesPage from "../pages/BrowseCoursesPage.vue";
import CourseViewPage from "../pages/CourseViewPage.vue";
import CourseLearnPage from "../pages/CourseLearnPage.vue";
import CertificatesPage from "../pages/CertificatesPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/courses',
        component: CoursesPage
    },
    {
        path: '/signin',
        component: SignInPage,
        meta: { title: 'Sign In' }
    },
    {
        path: '/login/student',
        component: LoginStudentPage,
        meta: { title: 'Student Login' }
    },
    {
        path: '/login/admin',
        component: LoginAdminPage,
        meta: { title: 'Admin Login' }
    },
    // User Dashboard Routes (Standalone Layout)
    {
        path: '/dashboard',
        component: UserLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                component: UserDashboardPage,
                meta: { title: 'Dashboard', requiresAuth: true }
            },
            {
                path: 'courses',
                component: UserCoursesPage,
                meta: { title: 'My Courses', requiresAuth: true }
            },
            {
                path: 'browse',
                component: BrowseCoursesPage,
                meta: { title: 'Browse Courses', requiresAuth: true }
            },
            {
                path: 'course/:id',
                component: CourseViewPage,
                meta: { title: 'Course View', requiresAuth: true }
            },
            {
                path: 'learn/:id',
                component: CourseLearnPage,
                meta: { title: 'Learning', requiresAuth: true }
            },
            {
                path: 'certificates',
                component: CertificatesPage,
                meta: { title: 'Certificates', requiresAuth: true }
            },
            {
                path: 'profile',
                component: ProfilePage,
                meta: { title: 'Profile', requiresAuth: true }
            }
        ]
    },
    // Admin Dashboard Routes
    {
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAdmin: true },
        children: [
            {
                path: '',
                component: AdminDashboardPage,
                meta: { title: 'Dashboard', requiresAdmin: true }
            },
            {
                path: 'courses',
                component: AdminCoursesPage,
                meta: { title: 'Course Management', requiresAdmin: true }
            },
            {
                path: 'users',
                component: AdminUsersPage,
                meta: { title: 'User Management', requiresAdmin: true }
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Route guards
router.beforeEach((to, from, next) => {
    const isAuthenticated = authService.isAuthenticated();
    const isAdmin = authService.isAdmin();
    
    // Check if route requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            // Redirect to signin if not authenticated
            next('/signin');
        } else {
            next();
        }
    }
    // Check if route requires admin role
    else if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (!isAuthenticated) {
            // Redirect to admin login if not authenticated
            next('/login/admin');
        } else if (!isAdmin) {
            // Redirect to home if authenticated but not admin
            next('/');
        } else {
            next();
        }
    }
    // Public route
    else {
        next();
    }
});

export default router;