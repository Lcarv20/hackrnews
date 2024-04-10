import { twJoin } from "tailwind-merge";
import { josefinSans } from "@/utils/fonts";

import "@app/globals.css";
import Providers from "@/providers";
import { Toaster } from "@/ui/toaster";

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="root" className="body-gradient2 antialiased">
        <Providers>
          <main
            className={twJoin(
              "text-textColor",
              "transition-colors duration-200 ease-linear",
              josefinSans.className,
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

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto container p-4 h-[100dvh]">{children}</div>
  );
}
