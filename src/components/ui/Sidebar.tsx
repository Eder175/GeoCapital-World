'use client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCallback } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const { logout } = useAuthContext();

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded hover:bg-gray-700 transition ${
      pathname === path ? 'bg-gray-800 text-blue-400' : 'text-white'
    }`;

  const handleLogout = useCallback(() => {
    logout();
    router.push('/login');
  }, [logout, router]);

  return (
    <aside className="w-64 h-screen bg-gray-900 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6 text-white">GeoCapital</h2>
        <nav className="space-y-2">
          <Link href="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>
          <Link href="/debts" className={linkClass('/debts')}>Dívidas</Link>
          <Link href="/settings" className={linkClass('/settings')}>Configurações</Link>
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
      >
        Sair
      </button>
    </aside>
  );
};

export default Sidebar;
