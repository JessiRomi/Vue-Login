import { defineStore } from 'pinia'; // Importa la librería de Pinia
import type { User } from '@/models/UserModel';

 // Crea el store
export const UserStore = defineStore('user', {
  state: () => ({
    userData: {} as User, // Inicializa la variable de usuario
  }),
  actions: {
    setUser(data: User) { // Establece la variable de usuario
      this.userData = data; //Actualiza la variable de usuario
    },
  },
  getters: {
    getUser: (state) => state.userData, // Getter que retorna los datos del usuario desde el estado
  },
});

