"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error("Application error:", error);
    
    // In production, you could send this to an error tracking service
    // e.g., Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === "production") {
      // Example: logErrorToService(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Glass card container */}
        <div className="glass-card p-8 space-y-6">
          {/* Error icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Error message */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
              Something went wrong
            </h2>
            <p className="text-text-secondary">
              We encountered an unexpected error. Please try again or contact support if the problem persists.
            </p>
          </div>

          {/* Error details (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-4 bg-red-500/5 border border-red-500/20 rounded-lg text-left">
              <p className="text-sm font-mono text-red-400 break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} variant="primary">
              Try again
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="secondary"
            >
              Go home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
