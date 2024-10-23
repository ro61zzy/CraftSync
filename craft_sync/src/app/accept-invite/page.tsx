// src/app/accept-invite/page.tsx
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AcceptInvite() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get('token');

  useEffect(() => {
    async function fetchInvite() {
      const res = await fetch(`/api/invites?token=${inviteToken}`);
      const data = await res.json();
      setEmail(data.email);  // Pre-fill email from the invite
      setRole(data.role);    // Pre-fill role from the invite
    }
    fetchInvite();
  }, [inviteToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });

    if (res.ok) {
      router.push('/auth/signin');
    } else {
      alert('Error completing registration');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md">
        <h1 className="text-2xl mb-4">Complete Your Registration</h1>
        <input
          type="email"
          value={email}
          readOnly
          className="border p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Sign Up
        </button>
      </form>
    </div>
  );
}
