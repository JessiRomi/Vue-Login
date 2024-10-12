// Definir la interfaz de usuario
export interface User {
  id: number,
  firstName: string,
  lastName: string,  
  userName: string;
  password: string;
  remember?: boolean,
  isAdmin: boolean,
  jwtToken?: string,
  refreshTokens: string[]
  }
  