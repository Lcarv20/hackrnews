import NostrProvider from "./nostr-provider";
import ThemeProvider from "./theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <NostrProvider>
        {children}
      </NostrProvider>;
    </ThemeProvider>
  );
}
