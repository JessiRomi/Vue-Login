 //Script principal

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App); //Se crea la aplicacion
app.use(createPinia()); //Se crea el pinia
app.use(router);//Se crea el router
app.mount('#app');//Se manda a llamar el html

