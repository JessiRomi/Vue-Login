<script setup lang="ts">
 // Importaciones
  import { useSesionStore } from '@/stores/sesionStore'; 
  import { UserStore } from '../stores/userStore';
  import { useRouter } from 'vue-router'; 
  
  const sesionStore = useSesionStore(); // Instancia del store de sesión
  const router = useRouter(); // Instancia del router de Vue
  const userStore = UserStore(); // Instancia del store de usuario
  const sessionData = sesionStore.data; // Datos de sesión
  
  // Obtiene los datos del usuario logueado desde el localStorage
  const userLogued = JSON.parse(localStorage.getItem("userLogued")!); 
  
  // Función para crear un nuevo usuario
  const createUser = () => { 
    try {
      // Llama a la acción del store que se encarga de crear un nuevo usuario
      userStore.createUser(); 
    } catch (error) {
      // Maneja el error en caso de que ocurra un problema al crear el usuario
      console.error('Error al crear el usuario:', error); 
    }
  };
  
  // Función para cerrar sesión
  const logout = () => { 
    // Resetea los datos del store de usuario
    userStore.$reset(); 
    
    // Redirige al usuario a la página de login
    router.push({ name: 'login' }); 
  };

</script>

<!-- Componente de la vista que muestra los datos del usuario y controles de sesión -->
<template>
  <div class="container">
    
    <!-- Muestra un saludo personalizado con el nombre del usuario logueado -->
    <h1>Hola {{ userLogued.firstName }}</h1>
    
    <div class="session-info">
    <h2>Información de tu usuario</h2>
    <p>Rol del usuario: {{ userLogued.isAdmin === true ? 'Administrador' : 'Usuario' }}</p>
    <p>Nombre de usuario: {{ userLogued.username }}</p>
    </div>
    
    <!-- Sección para mostrar información detallada de la sesión del usuario -->
    <div class="session-info">
      <h2>Información de sesión</h2>
      <p><strong>Token Payload:</strong> {{ sessionData.tokenPayload }}</p>
      <p><strong>Creado:</strong> {{ sessionData.createdAt.toLocaleString() }}</p>
      <p><strong>Expira:</strong> {{ sessionData.expiresAt.toLocaleString() }}</p>
      <p><strong>Se refrescará:</strong> {{ sessionData.refreshedAt.toLocaleString() }}</p>
    </div>

    <!-- Si el usuario es administrador, muestra controles adicionales para gestionar usuarios -->
    <div v-if="userLogued.isAdmin" class="admin-controls">
      <h2>Usuarios</h2>
      <!-- Lista de usuarios del sistema con su rol (administrador o usuario) -->
      <ul>
        <li v-for="user in userStore.users" :key="user.id">
          {{ user.username }}: {{ user.firstName }} {{ user.lastName }} 
          {{ user.isAdmin === true ? "[Administrador]" : "[Usuario]" }}
        </li>
      </ul>
      
      <!-- Botón para crear un nuevo usuario -->
      <button @click="createUser()">Crear nuevo usuario</button>
    </div>

    <!-- Botón para cerrar sesión que llama a la función 'logout' -->
    <button class="logout-btn" @click="logout">Cerrar sesión</button>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.8rem;
  color: rgb(13, 13, 13);
  text-align: center;
  margin-bottom: 20px;
}

h2{
  color:black;
}

p {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: rgb(251, 251, 251);
  margin: 10px 0;
}

.container {
  background: rgba(255, 255, 255, 0.1); /* Fondo translúcido */
  padding: 30px;
  border-radius: 15px;
  border: 2px solid rgba(255, 255, 255, 0.3); /* Borde tenue */
  width: 400px;
  margin: 100px auto; /* Centrar verticalmente */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); /* Sombra difusa */
  backdrop-filter: blur(10px); /* Efecto de desenfoque */
  text-align: center;
}

.session-info, .admin-controls {
  margin-top: 15px;
  color: white; /* Cambiar color de texto a blanco */
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.3); /* Línea de separación */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: rgba(255, 255, 255, 0.15);
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
}

label {
  display: block;
  color: white; /* Cambiar el color del label */
  margin-top: 10px;
}

.error {
  color: red;
  font-size: 0.85em;
}

button {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.3); 
}

.logout-btn {
  background-color: rgb(70, 40, 203);
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #7660d6;
}

hr {
  border: none;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 20px 0;
}
</style>

