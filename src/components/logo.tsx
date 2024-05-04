import { silkScreen } from "@/utils/fonts";
import Link from "next/link";
import { twJoin } from "tailwind-merge";

export default function Logo({ isLink = true }: { isLink?: boolean }) {
  if (isLink) {
    return (
      <Link
        href="/"
        className="focus:outline-none focus:ring-2 focus:ring-ring ring-offset-background p-2 rounded-lg"
      >
        <h1
          className={twJoin(
            "text-3xl uppercase",
            silkScreen.className,
            // tourney.className,
          )}
        >
          <span className="text-brand">Artic</span>ool
        </h1>
      </Link>
    );
  }

  return (
    <h1
      className={twJoin(
        "text-3xl uppercase",
        silkScreen.className,
        // tourney.className,
      )}
    >
      <span className="text-brand">Artic</span>ool
    </h1>
  );
}
