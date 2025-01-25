import { Shield } from 'lucide-react'; // Icono de Lucide React
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Shield
        className="w-6 h-6"
        style={{
          stroke: 'url(#gradient)', // Aplicar el gradiente
        }}
      />
      <span
        className="text-transparent bg-clip-text"
        style={{
          backgroundImage: 'linear-gradient(to right, rgb(var(--gradient-start)), rgb(var(--gradient-end)))',
        }}
      >
        VerifyInfluencers
      </span>
      {/* Definición del gradiente para el icono */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(var(--gradient-start))" />
            <stop offset="100%" stopColor="rgb(var(--gradient-end))" />
          </linearGradient>
        </defs>
      </svg>
    </Link>
  );
}
