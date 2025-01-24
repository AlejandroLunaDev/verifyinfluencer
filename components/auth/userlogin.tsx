'use client';
import { useUserStore } from '@/lib/store/user-store';
import { Button } from '../ui/button';

type UserStore = {
  user: { name: string } | null;
  login: (user: { name: string }) => void;
  logout: () => void;
};
import { LogIn, LogOut } from 'lucide-react';

export default function UserLogin() {
  const { user, login, logout } = useUserStore() as UserStore; // Obtenemos el estado y acciones del store

  const handleClick = () => {
    if (user) {
      logout(); // Si hay usuario, cierra sesión
    } else {
      login({ name: 'Demo User' }); // Si no hay usuario, inicia sesión con datos de ejemplo
    }
  };

  return (
    <Button variant="ghost" onClick={handleClick}>
      {user ? <LogOut className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
      {user ? 'Logout' : 'Login'}
    </Button>
  );
}
