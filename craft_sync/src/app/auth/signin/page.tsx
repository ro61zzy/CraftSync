// src/app/auth/signin/page.tsx
"use client"
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  
    if (res?.error) {
      alert(res.error); // This will show the error returned by the server.
    } else if (res?.ok) {
      router.push('/dashboard');
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md">
        <h1 className="text-2xl mb-4">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary text-black transition duration-200"

        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary text-black transition duration-200"

        />
        <button type="submit"  className="bg-primary text-white p-3 w-full rounded-lg shadow hover:bg-hover transition duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
