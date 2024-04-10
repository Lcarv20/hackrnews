"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="space-y-4">
        <section>
          <h1 className="text-4xl">Oops!</h1>
          <h2 className="text-2xl">Something went wrong!</h2>
        </section>

        <div className="p-4 border border-error rounded-lg bg-error/10 max-w-md overflow-scroll">
          <h4 className="text-xl">{error.name}</h4>
          <pre className="overflow-scroll w-full bg-background p-2 text-sm">
            {error.message}
          </pre>
        </div>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}

