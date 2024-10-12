import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue'; // Importa el componente LoginPage 
import HomeView from '../views/HomeView.vue'; // Importa el componente HomeView

//Define las rutas
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage, // Configura la nueva ruta 
  },
  {
    path: '/',
    name: 'home',
    component: HomeView, // Configura la nueva ruta
  },
];

//Crea el router
const router = createRouter({
  history: createWebHistory(), // Configura el historial de navegación
  routes, // Configura las rutas
});

export default router; // Exporta el router



