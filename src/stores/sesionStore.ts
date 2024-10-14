// Importar la librería de Pinia
import { defineStore } from 'pinia'; 
import type { SesionState } from '@/models/SesionState'; 

// Define la tienda de Pinia con el nombre 'sesion'
export const useSesionStore = defineStore('sesion', {
  // Estado inicial de la tienda
  state: (): SesionState => ({
    loading: false, // Estado de carga
    data: {
      // Inicializa el estado con los datos de sesión obtenidos del localStorage
      tokenPayload: JSON.parse(localStorage.getItem("userLogued")!).jwtToken!.replace("fake-jwt-token.",""), 
      // Extrae el JWT desde el localStorage, y reemplaza el prefijo 'fake-jwt-token.' para obtener solo el payload
      createdAt: new Date(), // Fecha la fecha de creación del token
      refreshedAt: new Date(), // Fecha la fecha de refresco del token
      expiresAt: new Date(), // Fecha la fecha de expiración del token
    },
  }),
  
  // Acciones para modificar el estado
  actions: {
    // Acción para actualizar el estado de la sesión
    update(payload: string, createdAt: Date, refreshedAt: Date, expiresAt: Date) {
      this.data.tokenPayload = payload; // Actualiza el payload del token
      this.data.createdAt = createdAt; // Actualiza la fecha de creación del token
      this.data.refreshedAt = refreshedAt; // Actualiza la fecha de refresco del token
      this.data.expiresAt = expiresAt; // Actualiza la fecha de expiración del token
    },
  },
});

