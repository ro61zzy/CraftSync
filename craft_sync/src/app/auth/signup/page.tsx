// src/app/auth/signup/page.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'ADMIN' }), 
    });

    if (res.ok) {
      router.push('/auth/signin');
    } else {
      alert('Error creating account');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-96">
      <h1 className="text-3xl font-bold mb-6 text-center text-header">
  Project Manager
  <br />
  <span className="text-2xl">Sign Up</span>
</h1>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white p-3 w-full rounded-lg shadow hover:bg-hover transition duration-200"
        >
          Sign Up as Admin
        </button>
        <p className="text-center mt-4 text-gray-400">
          Already have an account?{' '}
          <a href="/auth/signin" className="text-primary hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
