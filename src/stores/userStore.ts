import { defineStore } from 'pinia'; // Importa la librería de Pinia
import type { User } from '@/models/UserModel'; // Asegúrate de que la ruta a tu modelo sea correcta


// Crea el store
export const UserStore = defineStore('user', {
  state: () => ({
    id : 0,
    userData: {} as User, // Inicializa la variable de usuario
    users: JSON.parse(localStorage.getItem("vue-3-jwt-refresh-token-users")!) as User[], // Lista de usuarios
  }),
  actions: {
    increasesId(){
      this.id++;
    },
    setUser(data: User) { // Establece la variable de usuario
      this.userData = data; // Actualiza la variable de usuario
    },
    createUser() { // Acción para crear un nuevo usuario
      this.increasesId();
            const newUser = {
              username: 'Usuario'+this.id,
              password: 'user123',
              id: this.id,
              firstName: 'Gaston',
              lastName: 'Aravena',
              isAdmin: false,
              refreshTokens: []
            };
      const userExists = this.users.some(user => user.username === newUser.username);
      if (userExists) {
        throw new Error('El nombre de usuario ya existe'); // Maneja el error de duplicado
      }

      this.users.push(newUser); // Agregar el nuevo usuario a la lista de usuarios
      localStorage.setItem("vue-3-jwt-refresh-token-users", JSON.stringify(this.users));
    },
  },
  getters: {
    getUser: (state) => state.userData, // Getter que retorna los datos del usuario desde el estado
  },
});
