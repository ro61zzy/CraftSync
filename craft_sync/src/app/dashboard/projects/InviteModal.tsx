// src/app/dashboard/projects/InviteModal.tsx

"use client";
import { useState } from "react";

interface InviteModalProps {
  projectId: string;
  onClose: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ projectId, onClose }) => {
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("TEAM");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setMessage("Please enter a phone number.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/invites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, role, projectId }), // Include projectId in the request
    });

    if (res.ok) {
      const inviteData = await res.json();
      console.log("Invite data with token:", inviteData);

      // Only encode the invite link to ensure proper WhatsApp parsing
      const encodedInviteLink = encodeURIComponent(inviteData.inviteLink);
      const whatsappLink = `https://wa.me/${phone}?text=You+have+been+invited+to+join+the+project.+Click+the+link+to+accept:+${encodedInviteLink}`;      

      console.log("Phone Number:", phone);
console.log("Invite Link:", inviteData.inviteLink);
console.log("Encoded Invite Link:", encodedInviteLink);
console.log("WhatsApp Link:", whatsappLink);


      window.open(whatsappLink, "_blank"); // Opens WhatsApp link
      setMessage("Invite sent successfully");
      setPhone(""); // Clear the input field after sending
    } else {
      setMessage("Error sending invite");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Invite Users to Project</h2>
        <form onSubmit={handleInviteSubmit} className="space-y-4">
          <input
            type="tel"
            placeholder="User Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full rounded text-black"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="TEAM">Invite as Team Member</option>
            <option value="CLIENT">Invite as Client</option>
          </select>
          <button
            type="submit"
            className="bg-primary text-white p-2 w-full rounded"
          >
            {loading ? "Sending..." : "Send Invite via WhatsApp"}
          </button>
        </form>
        {message && <p className="text-red-500 mt-4 text-center">{message}</p>}

        <button onClick={onClose} className="mt-4 text-gray-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default InviteModal;