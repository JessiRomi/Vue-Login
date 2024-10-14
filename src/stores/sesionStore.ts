// stores/sesionStore.ts
import { defineStore } from 'pinia';
import type { SesionState } from '@/models/SesionState';

export const useSesionStore = defineStore('sesion', {
  state: (): SesionState => ({
    loading: false,
    data: {
      tokenPayload: JSON.parse(localStorage.getItem("userLogued")!).jwtToken!.replace("fake-jwt-token.",""),
      createdAt: new Date(),
      refreshedAt: new Date(),
      expiresAt: new Date(),
    },
  }),
  actions: {
    update(payload: string, createdAt: Date, refreshedAt: Date, expiresAt: Date) {
      this.data.tokenPayload = payload;
      this.data.createdAt = createdAt;
      this.data.refreshedAt = refreshedAt;
      this.data.expiresAt = expiresAt;
    },
  },
});
