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
  const [inviteLink, setInviteLink] = useState("");

  // Generate the invite link without sending it
  const handleGenerateLink = async () => {
    if (!phone) {
      setMessage("Please enter a phone number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, role, projectId }),
      });

      if (res.ok) {
        const inviteData = await res.json();
        setInviteLink(inviteData.inviteLink); // Set the invite link for display
        setMessage("Invite link generated successfully.");
      } else {
        setMessage("Error generating invite link.");
      }
    } catch (error) {
      console.error("Error generating invite link:", error);
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  // Copy the invite link to the clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setMessage("Invite link copied to clipboard!");
    }).catch(() => {
      setMessage("Failed to copy the link.");
    });
  };

  // Send invite via WhatsApp using the generated link
  const handleSendViaWhatsApp = () => {
    if (!inviteLink) {
      setMessage("Please generate the invite link first.");
      return;
    }

    const encodedInviteLink = encodeURIComponent(inviteLink);
    const whatsappLink = `https://wa.me/${phone}?text=You+have+been+invited+to+join+the+project.+Click+the+link+to+accept:+${encodedInviteLink}`;
    window.open(whatsappLink, "_blank"); // Opens WhatsApp link
    setMessage("Invite sent via WhatsApp!");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Invite Users to Project</h2>
        
        {/* Input fields for phone number and role */}
        <input
          type="tel"
          placeholder="User Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full rounded text-black mb-2"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 w-full rounded mb-4"
        >
          <option value="TEAM">Invite as Team Member</option>
          <option value="CLIENT">Invite as Client</option>
        </select>

        {/* Button to generate the invite link */}
        <button
          onClick={handleGenerateLink}
          className="bg-primary text-white p-2 w-full rounded mb-2"
          disabled={loading}
        >
          {loading ? "Generating Link..." : "Generate Link"}
        </button>

        {/* Display Invite Link and Copy Button */}
        {inviteLink && (
          <div className="mt-4">
            <p>Invite Link:</p>
            <div className="flex items-center">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="border p-2 w-full rounded text-black"
              />
              <button
                onClick={handleCopyLink}
                className="bg-gray-200 ml-2 px-3 py-1 rounded"
              >
                Copy Link
              </button>
            </div>
          </div>
        )}

        {/* Optional button to send via WhatsApp */}
        <button
          onClick={handleSendViaWhatsApp}
          className="bg-green-500 text-white p-2 w-full rounded mt-4"
        >
          Send Invite via WhatsApp
        </button>

        {/* Display messages */}
        {message && <p className="text-red-500 mt-4 text-center">{message}</p>}

        <button onClick={onClose} className="mt-4 text-gray-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default InviteModal;
