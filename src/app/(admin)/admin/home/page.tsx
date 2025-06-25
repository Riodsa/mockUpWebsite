'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log('Session data:', session);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: true }); // Sign out without immediate redirect
    //   router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome, </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
      >
        Log Out
      </button>
    </div>
  );
}