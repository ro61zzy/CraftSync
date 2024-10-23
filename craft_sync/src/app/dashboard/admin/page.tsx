// src/app/dashboard/admin/page.tsx
import React, { useState } from 'react';

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('TEAM'); // Default invite role is TEAM
  const [message, setMessage] = useState('');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/invites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    });

    if (res.ok) {
      setMessage('Invite sent successfully');
    } else {
      setMessage('Error sending invite');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <form onSubmit={handleInvite} className="mb-8">
        <h2 className="text-xl font-bold mb-2">Invite Users</h2>
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="TEAM">Invite as Team Member</option>
          <option value="CLIENT">Invite as Client</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Send Invite
        </button>
        {message && <p className="mt-4">{message}</p>}
      </form>

      {/* Here you can add logic to show existing team members and clients */}
      {/* Fetch and display them from the API */}
    </div>
  );
}
