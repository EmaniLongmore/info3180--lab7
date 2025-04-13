import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddMovieFormView from '../views/AddMovieFormView.vue'  // Import the AddMovieFormView component

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // Route level code-splitting
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/movies/create',  // New route for movie creation form
      name: 'add-movie',
      component: AddMovieFormView  // Use the AddMovieFormView component for this route
    }
  ]
})

export default router
