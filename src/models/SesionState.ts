// Definir la interfaz de sesion
import type { Sesion } from '@/models/sesionModel';

export interface SesionState {
  loading: boolean;
  data: Sesion;
}
