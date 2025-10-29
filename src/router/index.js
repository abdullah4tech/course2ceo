import { createWebHistory, createRouter } from "vue-router";
import CoursesPage from "../pages/CoursesPage.vue";
import HomePage from "../pages/HomePage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

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
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;