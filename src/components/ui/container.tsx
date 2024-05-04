export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto container p-4 h-[100dvh]">{children}</div>
  );
}
