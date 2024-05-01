import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-full'>
      <Link href="/">
        <Button >
          <HomeIcon className="w-5 h-5" />
        </Button>
      </Link>
      {children}
    </div>
  );
}
