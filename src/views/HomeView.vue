<!-- Vista para mostrar los datos del usuario -->
<template>
  <div class="container">
    <h1>Bienvenidos </h1>
    <p>Datos del usuario:</p>
    <div class="user-info">
      <p>Nombre de usuario: {{ userData.user }}</p> <!-- Muestra el nombre de usuario -->
      <p>Contraseña: {{ userData.password }}</p> <!-- Muestra la contraseña -->
      <p>Recordarme: {{ userData.remember ? 'Sí' : 'No' }}</p> <!-- Muestra si se ha recordado la contraseña -->
    </div>
    <!-- Botón para cerrar sesión -->
    <button class="logout-btn" @click="logout">Cerrar sesión</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/userStore'; // Importa el store 'userStore'
import { useRouter } from 'vue-router'; // Importa el router para redirección

const router = useRouter(); // Crea una instancia del router
const userStore = useUserStore(); // Crea una instancia del store
const userData = userStore.getUser; // Obtiene los datos del usuario

// Función para cerrar sesión
const logout = () => {
  userStore.$reset(); // Resetea los datos del usuario en el store
  router.push({ name: 'Login' }); // Redirige a la página de inicio de sesión
};
</script>

<style scoped>
  h1 {
    font-family: 'Ubuntu', sans-serif;
    font-size: 2.5rem;
    color: black;
    text-align: center;
    margin-bottom: 20px;
  }

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 1.2rem;
    color: black;
    margin: 10px 0;
  }

  .container {
    background-color: #fefefe;
    padding: 30px;
    border-radius: 15px;
    border: 2px solid #c9ada7;
    width: 350px;
    margin: auto;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .user-info {
    background: linear-gradient(135deg, #c9ada7, #9a8c98);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px; /* Añade separación debajo de la sección de información */
  }

  .user-info p {
    font-size: 1.1rem;
    color: #f2e9e4;
  }

  /* Contenedor del botón para centrarlo */
  .button-container {
    display: flex;
    justify-content: center; /* Centra horizontalmente */
    margin-top: 30px; /* Aumentar la separación superior del botón */
  }

  /* Estilo del botón de cerrar sesión */
  .logout-btn {
    padding: 10px 20px;
    background-color: #c9ada7;
    border: none;
    border-radius: 10px;
    color: black;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;
    margin-top: 10px; /* Añade un margen superior */
  }

  .logout-btn:hover {
    background-color: #9a8c98;
  }

  body {
    background-color: #f2e9e4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  } 
</style>





