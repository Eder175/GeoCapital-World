'use client';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/ui/Sidebar';

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
