<script setup lang="ts">

  import { useSesionStore } from '@/stores/sesionStore';
  import { UserStore } from '../stores/userStore'; // Importa el store 'userStore'
  import { useRouter } from 'vue-router'; // Importa el router para redirección
  import * as yup from 'yup'; // Importa yup para la validación de formularios
  
  // Instancias del store y router
  const sesionStore = useSesionStore();
  const router = useRouter(); // Crea una instancia del router
  const userStore = UserStore(); // Crea una instancia del store

  // Datos de sesión
  const sessionData = sesionStore.data;
  const userLogued = JSON.parse(localStorage.getItem("userLogued")!);
  
  // Función para crear un nuevo usuario
  const createUser = async () => {
    try {
      userStore.createUser(); // Llama a la acción del store para crear el usuario
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };
  
  // Función para cerrar sesión
  const logout = () => {
    userStore.$reset(); // Resetea los datos del usuario en el store
    router.push({ name: 'login' }); // Redirige a la página de inicio de sesión
  };
  </script>
  
  <!-- Vista para mostrar los datos del usuario -->
  <template>
    <div class="container">
      <h1>Hola {{ userLogued.firstName }}</h1>
      <h2>Informacion de tu usuario</h2>
      <p>Rol del usuario: {{ userLogued.isAdmin === true ? 'Administrador' : 'Usuario' }}</p>
      <p>Nombre de usuario: {{ userLogued.username }}</p>
      <div class="session-info">
        <h2>Información de sesión</h2>
        <p><strong>Token Payload:</strong> {{ sessionData.tokenPayload }}</p>
        <p><strong>Creado:</strong> {{ sessionData.createdAt.toLocaleString() }}</p>
        <p><strong>Expira:</strong> {{ sessionData.expiresAt.toLocaleString() }}</p>
        <p><strong>Se refrescará:</strong> {{ sessionData.refreshedAt.toLocaleString() }}</p>
      </div>
  
      <div v-if="userLogued.isAdmin" class="admin-controls">
        <h2>Usuarios</h2>
        <ul>
          <li v-for="user in userStore.users" :key="user.id">{{ user.username }}: {{ user.firstName }} {{ user.lastName }} {{ user.isAdmin === true ? "[Administrador]":"[Usuario]" }}</li>
        </ul>
        <button @click="createUser()">Crear nuevo usuario</button>
      </div>
  
      <!-- Botón para cerrar sesión -->
      <button class="logout-btn" @click="logout">Cerrar sesión</button>
    </div>
  </template>
  
<style scoped>
h1 {
  font-family: 'Ubuntu', sans-serif;
  font-size: 2.5rem;
  color: white;
  text-align: center;
  margin-bottom: 20px;
}

p {
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  color: white;
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
  margin-top: 20px;
  color: white; /* Cambiar color de texto a blanco */
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
  background-color:rgb(70, 40, 203);
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

</style>

