import { twJoin } from "tailwind-merge";
import { josefinSans, outfit, silkScreen } from "@/utils/fonts";

import "./globals.css";
import Providers from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        id="root"
        className={cn(
          "body-gradient bg-background antialiased",
          outfit.className,
        )}
      >
        <Providers>
          <main
            className={twJoin(
              "text-textColor",
              "transition-colors duration-200 ease-linear",
            )}
          >
            <Container>
              {children}
              {authModal}
            </Container>
          </main>
          <div id="modal-root" />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
