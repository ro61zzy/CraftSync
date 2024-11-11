// src/app/accept-invite/page.tsx

"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AcceptInvitePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inviteData, setInviteData] = useState<{ role: string; projectId: number } | null>(null);

  useEffect(() => {
    const fetchInviteData = async () => {
      if (!token) {
        setError("No invite token provided.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/invites/validate?token=${token}`);
        if (res.ok) {
          const data = await res.json();
          setInviteData(data);
        } else {
          setError("Invalid or expired invite token.");
        }
      } catch (error) {
        setError("An error occurred while validating the invite.");
      } finally {
        setLoading(false);
      }
    };

    fetchInviteData();
  }, [token]);

  const handleSignupRedirect = () => {
    if (inviteData) {
      router.push(`/auth/signup?role=${inviteData.role}&projectId=${inviteData.projectId}&token=${token}`);
    }
  };

  const handleLoginRedirect = () => {
    if (inviteData) {
      router.push(`/auth/login?token=${token}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>You've been invited to join as a {inviteData?.role}</h2>
      <button onClick={handleSignupRedirect} className="btn-primary">Sign Up</button>
      <button onClick={handleLoginRedirect} className="btn-secondary">Log In</button>
    </div>
  );
};

export default AcceptInvitePage;
