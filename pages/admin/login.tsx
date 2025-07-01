import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('admin-auth');
    if (auth === 'true') {
      router.replace('/admin');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        localStorage.setItem('admin-auth', 'true');
        router.replace('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Something went wrong');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ height: '90vh' }} className="flex items-center justify-center bg-gray-100 p-6">
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
