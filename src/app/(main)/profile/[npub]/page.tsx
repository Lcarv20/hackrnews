export default function Page({ params }: { params: { npub: string } }) {
  return <div>Profile pubkey: {params.npub}</div>;
}
