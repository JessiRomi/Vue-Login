<script setup lang="ts">

  import { useSesionStore } from '@/stores/sesionStore';
  import { UserStore } from '../stores/userStore'; // Importa el store 'userStore'
  import { useRouter } from 'vue-router'; // Importa el router para redirección
  import { ref } from 'vue';
  import { Form, Field } from 'vee-validate'; // Importa los componentes de vee-validate
  import * as yup from 'yup'; // Importa yup para la validación de formularios
  
  // Instancias del store y router
  const sesionStore = useSesionStore();
  const router = useRouter(); // Crea una instancia del router
  const userStore = UserStore(); // Crea una instancia del store
  const showCreateUserForm = ref(false); // Para mostrar u ocultar el formulario
  
  // Datos de sesión
  const sessionData = sesionStore.data;
  
  // Esquema de validación
  const schema = yup.object({
    username: yup.string().required('El nombre de usuario es requerido'),
    password: yup.string().required('La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  });
  
  // Función para crear un nuevo usuario
  const createUser = async () => {
    try {
      await userStore.createUser(); // Llama a la acción del store para crear el usuario
      showCreateUserForm.value = false; // Ocultar el formulario
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };
  
  // Función para cerrar sesión
  const logout = () => {
    userStore.$reset(); // Resetea los datos del usuario en el store
    router.push({ name: 'Login' }); // Redirige a la página de inicio de sesión
  };
  </script>
  
  <!-- Vista para mostrar los datos del usuario -->
  <template>
    <div class="container">
      <h1>Bienvenidos</h1>
      <p>Rol del usuario: {{ userStore.role === 'admin' ? 'Administrador' : 'Usuario' }}</p>
      <div class="session-info">
        <p><strong>Token Payload:</strong> {{ sessionData.tokenPayload }}</p>
        <p><strong>Creado:</strong> {{ sessionData.createdAt.toLocaleString() }}</p>
        <p><strong>Expira:</strong> {{ sessionData.expiresAt.toLocaleString() }}</p>
        <p><strong>Se refrescará:</strong> {{ sessionData.refreshedAt.toLocaleString() }}</p>
      </div>
  
      <div v-if="userStore.role === 'admin'" class="admin-controls">
        <h2>Usuarios</h2>
        <ul>
          <li v-for="user in userStore.users" :key="user.id">{{ user.username }}</li>
        </ul>
        <button @click="showCreateUserForm = true">Crear nuevo usuario</button>
  
        <!-- Formulario para crear un nuevo usuario -->
        <div v-if="showCreateUserForm">
          <h3>Crear Nuevo Usuario</h3>
  
          <!-- Formulario con vee-validate -->
          <Form @submit="createUser" :validation-schema="schema" v-slot="{errors}" >
            <!-- Campo para el nombre de usuario -->
            <label for="username">Nombre de usuario:</label>
            <Field name="username" v-model="userStore.newUser.username" @input="userStore.setNewUserField('username', $event.target.value)" />
            <span class="error">{{ errors.username }}</span>
  
            <!-- Campo para la contraseña -->
            <label for="password">Contraseña:</label>
            <Field type="password" name="password" v-model="userStore.newUser.password" @input="userStore.setNewUserField('password', $event.target.value)" />
            <span class="error">{{ errors.password }}</span>
  
            <!-- Botones para crear o cancelar -->
            <button type="submit">Crear Usuario</button>
            <button type="button" @click="showCreateUserForm = false">Cancelar</button>
          </Form>
        </div>
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

