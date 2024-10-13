import { defineStore } from 'pinia'; // Importa la librería de Pinia
import type { User } from '@/models/UserModel'; // Asegúrate de que la ruta a tu modelo sea correcta

// Define el tipo del objeto newUser para asegurar que tenga username y password
interface NewUser {
  username: string;
  password: string;
  id: number;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  refreshTokens: string[];
}

// Crea el store
export const UserStore = defineStore('user', {
  state: () => ({
    userData: {} as User, // Inicializa la variable de usuario
    role: '' as 'admin' | 'user',
    users: [] as User[], // Lista de usuarios
    newUser: {
      username: '',
      password: '',
      id: 0,
      firstName: '',
      lastName: '',
      isAdmin: false,
      refreshTokens: []
    } as NewUser // Estado para el nuevo usuario
  }),
  actions: {
    setUser(data: User) { // Establece la variable de usuario
      this.userData = data; // Actualiza la variable de usuario
    },
    createUser() { // Acción para crear un nuevo usuario
      const userExists = this.users.some(user => user.username === this.newUser.username);
      if (userExists) {
        throw new Error('El nombre de usuario ya existe'); // Maneja el error de duplicado
      }
      this.users.push({ ...this.newUser }); // Agregar el nuevo usuario a la lista de usuarios
      // Limpiar los campos de newUser
      this.newUser = {
        username: '',
        password: '',
        id: 0,
        firstName: '',
        lastName: '',
        isAdmin: false,
        refreshTokens: []
      };
    },
    setNewUserField(field: keyof NewUser, value: string | number | boolean) {
      (this.newUser as any)[field] = value; // Actualiza un campo específico del nuevo usuario
    }
  },
  getters: {
    getUser: (state) => state.userData, // Getter que retorna los datos del usuario desde el estado
    getNewUser: (state) => state.newUser // Getter para obtener los datos de newUser
  },
});
