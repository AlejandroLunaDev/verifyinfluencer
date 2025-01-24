import {create} from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

export const useUserStore = create((set) => ({
user: null as User | null, // Estado inicial del usuario
login: (user: User) => set({ user }), // Acción para iniciar sesión
  logout: () => set({ user: null }), // Acción para cerrar sesión
}));
