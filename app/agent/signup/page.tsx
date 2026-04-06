"use client";

import { useEffect } from "react";

export default function AgentSignupPage() {
  useEffect(() => {
    window.location.href = "https://calendly.com/robopdesigns/strategy-call";
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4" />
        <p className="text-gray-600">Redirecting you to book your strategy call...</p>
      </div>
    </div>
  );
}
