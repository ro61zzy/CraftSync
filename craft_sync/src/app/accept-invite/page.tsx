
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AcceptInvitePage = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
      setMessage('Invalid invite link');
      setLoading(false);
      return;
    }

    // Verify the token
    fetch(`/api/invites/verify?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.projectId) {
          setMessage('Invite verified! Please sign up or log in to continue.');
        } else {
          setMessage('Invalid or expired invite link.');
        }
      })
      .catch(() => setMessage('An error occurred.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <p>{message}</p>
      {message.includes('verified') && (
        <button onClick={() => router.push('/auth/signup?token=abc123')}>
          Sign Up / Log In
        </button>
      )}
    </div>
  );
};

export default AcceptInvitePage;
