 //Script principal
import '@/assets/styles.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/authStore';
import { fakeBackend } from './helpers/fakeBackend';

import App from '@/App.vue';
import router from '@/router';

fakeBackend()
startApp()

async function startApp(){
    const app = createApp(App); //Se crea la aplicacion
    
    app.use(createPinia()); //Se crea el pinia
    app.use(router);//Se crea el router
    
    try{
        const authStore =useAuthStore()
        await authStore.resfreshToken
    } catch (error){
        console.warn('No hay datos de autenticacion para el usuario')
        console.info('Redirigiendo a login page')
        router.push('/login');
    }
    
    app.mount('#app');//Se manda a llamar el html

}
    






