import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers/fetchWrapper";
import type { User } from "@/models/UserModel";
import router from "@/router";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

// Función auxiliar para manejar el temporizador de refresco de token
function parseJwtExpiration(jwtToken: string) {
    const jwtBase64 = jwtToken.split(".")[1];
    const decodedJwtToken = JSON.parse(atob(jwtBase64));
    return new Date(decodedJwtToken.exp * 1000).getTime() - Date.now() - (60 * 1000);
}

// Define la tienda de Pinia para autenticación
export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        auth: {
            loading: false,
            data: null as User | null,
            refreshTokenTimeout: null as number | null,
        }
    }),
    actions: {
        // Acción para iniciar sesión
        async login(username: string, password: string) {
            this.auth.data = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password }, { credentials: 'include' });
            this.startRefreshTokenTimer();
            return this.auth.data;
        },
        
        // Acción para cerrar sesión
        logout() {
            fetchWrapper.post(`${baseUrl}/revoke-token`, {}, { credentials: 'include' });
            this.stopRefreshTokenTimer();
            this.auth.data = null;
            router.push({ name: '/' });
        },

        // Acción para refrescar el token
        async refreshToken() {
            this.auth.data = await fetchWrapper.post(`${baseUrl}/refresh-token`, {}, { credentials: 'include' });
            this.startRefreshTokenTimer();
        },

        // Iniciar el temporizador para refrescar el token antes de que expire
        startRefreshTokenTimer() {
            if (!this.auth.data || !this.auth.data.jwtToken) return;

            const timeout = parseJwtExpiration(this.auth.data.jwtToken);
            this.auth.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
        },

        // Detener el temporizador de refresco
        stopRefreshTokenTimer() {
            if (this.auth.refreshTokenTimeout) {
                clearTimeout(this.auth.refreshTokenTimeout);
                this.auth.refreshTokenTimeout = null;
            }
        }
    }
});
