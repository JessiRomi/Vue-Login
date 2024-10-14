import { defineStore } from 'pinia'; // Importa la librería de Pinia
import type { User } from '@/models/UserModel'; // Importa la interfaz de usuario

export const UserStore = defineStore('user', {
  state: () => ({
    id: 0, // Inicializa el ID
    userData: {} as User, // Inicializa la variable de usuario
    users: JSON.parse(localStorage.getItem("vue-3-jwt-refresh-token-users")!) as User[] || [], // Lista de usuarios, o un array vacío si no hay nada en localStorage
  }),
  actions: {
    setUser(data: User) { 
      this.userData = data; // Actualiza la variable de usuario
    },
    createUser() { 
      this.id++; // Incrementa el ID aquí directamente
      const newUser = {
        username: 'Usuario' + this.id,
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
      localStorage.setItem("vue-3-jwt-refresh-token-users", JSON.stringify(this.users)); // Actualiza localStorage
    },
  },
  getters: {
    getUser: (state) => state.userData, // Getter que retorna los datos del usuario desde el estado
  },
});
