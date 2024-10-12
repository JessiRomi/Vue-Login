import { defineStore } from "pinia";
import {fetchWrapper} from "@/helpers/fetchWrapper";
import { User} from "@/models/UserModel";
import router from "@/router";

const baseUrl =`${import.meta.env.VITE_API_VERSION}/users`   
export const useAuthStore = defineStore({
        id:"auth",
        state: ()=> ({
            auth:{} as { loading: boolean, data?: User | null, resfreshTokenTimeout: number | null} 
    }),
    actions: {
        async login (username: string, password: string){
            this.auth.data = await fetchWrapper.post(`${baseUrl}/authenticate`,{username, password},{ credentials: 'include'});
            this.startRefreshTokenTimer();
        },
        logout(){
            fetchWrapper.post (`${baseUrl}/revoke-token`,{},{ credentials: 'include'});
            this.startRefreshTokenTimer();
            this.auth.data = null;
            router.push({ name: '/login' });
        },
        async resfreshToken(){
            this.auth.data = await fetchWrapper.post(`${baseUrl}/refresh-token`,{}, { credentials: 'include'});
            this.startRefreshTokenTimer();
        },
        startRefreshTokenTimer(){
            if(!this.auth.data || !this.auth.data.jwtToken) return;
           
            // parsear un objeto JSON de base64
            const jwtBase64 = this.auth.data.jwtToken.split(".") [1];
            const decodedJwtToken = JSON.parse(atob(jwtBase64));

            // crear un timeout para resfescar el token antes de que expire
            const expires = new Date(decodedJwtToken.exp * 1000)
            const timeout = expires.getTime()- Date.now() -(60*1000)

            this.auth.resfreshTokenTimeout = setTimeout(this.resfreshToken, timeout)
    },
    stopRefreshTokenTimer(){
        if(this.auth.resfreshTokenTimeout){
            clearTimeout(this.auth.resfreshTokenTimeout);
            this.auth.resfreshTokenTimeout = null;
        }
    }
}
})