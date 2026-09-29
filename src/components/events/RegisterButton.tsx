"use client";

import { useState } from "react";

interface RegisterButtonProps {
  eventId: string;
  alreadyRegistered?: boolean;
}

export default function RegisterButton({
  eventId,
  alreadyRegistered = false,
}: RegisterButtonProps) {
  const [registered, setRegistered] = useState(alreadyRegistered);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setRegistered(true);
        setMessage("You're already registered.");
        return;
      }

      if (!response.ok || !data.success) {
        setMessage(data.message || "Registration failed.");
        return;
      }

      setRegistered(true);
      setMessage("You're registered!");
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleRegister}
        disabled={registered || loading}
        className={`w-full px-6 py-4 text-sm font-bold uppercase tracking-wider transition ${
          registered
            ? "cursor-default bg-[var(--success)] text-black"
            : "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
        }`}
      >
        {loading
          ? "Registering..."
          : registered
            ? "✓ Registered"
            : "Register for Event"}
      </button>

      {message && (
        <p className="mt-3 text-center text-sm text-[var(--muted)]">
          {message}
        </p>
      )}
    </div>
  );
}