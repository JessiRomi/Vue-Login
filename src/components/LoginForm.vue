<!-- Formulario de inicio de sesión -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

// Se define el valor de las variables
const router = useRouter();
const userStore = useUserStore();

// Variables reactivas para los campos del formulario
const user = ref(''); // Nombre de usuario
const password = ref(''); // Contraseña
const remember = ref(false); // Estado de "Recordarme"

// Función que se ejecuta al enviar el formulario
const submitForm = () => {
  // Guarda los datos de usuario en el store
  userStore.setUser({ user: user.value, password: password.value, remember: remember.value });
  console.log(userStore.getUser); // Muestra los datos almacenados en la consola
  router.push({ name: 'Home' }); // Redirige a la página Home después de iniciar sesión
};
</script>


<template>
  <!-- Contenedor principal del formulario -->
  <div class="wrapper">
    <!-- Evento submit que ejecuta la función 'submitForm' sin refrescar la página -->
    <form @submit.prevent="submitForm">
      <h1>Login</h1>

      <!-- Campo de entrada para el nombre de usuario -->
      <div class="input-bx">
        <input v-model="user" type="text" placeholder="Usuario" required />
        <ion-icon class="icon" name="person-circle"></ion-icon>
      </div>

      <!-- Campo de entrada para la contraseña -->
      <div class="input-bx">
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <ion-icon class="icon" name="lock-closed"></ion-icon>
      </div>

      <!-- Sección para la opción de "Recordarme" y enlace para contraseña olvidada -->
      <div class="remember-forgot">
        <label><input v-model="remember" type="checkbox" /> Recordarme</label>
        <a href="#">Olvidaste tu contraseña</a>
      </div>

      <!-- Botón para enviar el formulario -->
      <button type="submit" class="btn">Ingresar</button>
    </form>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&family=Saira:ital,wght@0,100..900;1,100..900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Saira", sans-serif;
  font-size: 16px;
}

body {
  /* Centra el contenido en el medio de la pantalla y aplica fondo */
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../assets/background.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  max-height: 100vh;
  max-width: 100vw;
}

.wrapper {
  /* Estilos del contenedor del formulario */
  width: 400px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, .2); /* Borde suave con transparencia */
  backdrop-filter: blur(20px); /* Efecto de desenfoque de fondo */
  box-shadow: 0 0 10px rgba(0,0,0,.2); /* Sombra ligera alrededor */
  color: #fff;
  padding: 30px 40px;
  border-radius: 15px; /* Bordes redondeados */
}

.wrapper h1 {
  /* Estilos para el título del formulario */
  font-size: 3em;
  text-align: center;
}

.wrapper .input-bx {
  /* Estilos para el contenedor de cada campo de entrada */
  position: relative;
  width: 100%;
  height: 50px;
  margin: 30px 0;
}

.wrapper .input-bx input {
  /* Estilos de los campos de entrada de texto */
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(255, 255, 255, .2); /* Borde transparente */
  border-radius: 15px;
  color: #fff;
  padding: 20px 45px 20px 20px;
}

.wrapper .input-bx input::placeholder {
  /* Estilos para los placeholders (texto de ayuda) en los campos */
  color: #fff;
}

.wrapper .input-bx .icon {
  /* Posiciona los íconos a la derecha de los campos de entrada */
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5em;
}

.wrapper .remember-forgot {
  /* Estilos para la sección de "Recordarme" y el enlace de contraseña */
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
  margin: -15px 0 15px;
}

.wrapper .remember-forgot label input {
  /* Estilo del checkbox de "Recordarme" */
  accent-color: #fff; /* Color del checkbox */
  margin-right: 3px;
}

.wrapper .remember-forgot a {
  /* Estilo del enlace de "Olvidaste tu contraseña" */
  color: #fff;
  text-decoration: none;
}

.wrapper .remember-forgot a:hover {
  /* Estilo al pasar el cursor sobre el enlace */
  text-decoration: underline;
}

.wrapper button {
  /* Estilos del botón de envío */
  width: 100%;
  height: 50px;
  border-radius: 15px;
  border: none;
  outline: none;
  box-shadow: 0 0 10px rgba(0,0,0,.1); /* Sombra del botón */
  cursor: pointer;
  font-size: 1.2em;
  font-weight: 600;
  color: #333; /* Color del texto del botón */
}
</style>



