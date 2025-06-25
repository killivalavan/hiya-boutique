import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Prevent redirect if already authenticated
    const auth = localStorage.getItem('admin-auth');
    if (auth === 'true') {
      router.replace('/admin');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('admin-auth', 'true');
      router.replace('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded shadow-md max-w-sm w-full"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            autoComplete="off"
            required
          />

          {error && (
            <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
     </>
  );
}
