import { twJoin } from "tailwind-merge";
import { outfit } from "@/lib/fonts";

import "./globals.css";
import Providers from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Articool",
  description: "Best articles on the web",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
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
            id="main"
            className={twJoin(
              "text-textColor",
              "transition-colors duration-200 ease-linear",
            )}
          >
            <Container>
              {modal}
              {children}
            </Container>
          </main>
          <div id="modal-root" />
          <Toaster
            toastOptions={{
              classNames: {
                error:
                  "bg-destructive text-destructive-foreground border-destructive",
                success: "bg-success text-success-foreground border-success",
                warning: "bg-warn text-warn-foreground border-warn",
                info: "bg-info text-info-foreground border-info",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
