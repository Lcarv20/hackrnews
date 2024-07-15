import Logo from "@/components/logo";
import { DEFAULT_SOURCE, NOSTR_WATCH } from "@/lib/constants";
import LoginForm from "./login-form";
import { cookies } from "next/headers";

export const revalidate = 3600; // revalidate at most every hour

export type Option = {
  readonly label: string;
  readonly value: string;
};

export default async function Login({ isModal = false }: { isModal: boolean }) {
  const preferedSource = cookies().get("prefered-source")?.value;
  let relays: Option[] = [];

  try {
    const res = await fetch(NOSTR_WATCH);
    const json = await res.json();
    relays = parseRelays(json);
  } catch (e) {
    // TODO: log to service
  }

  return (
    <div>
      <div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
        <div className="mb-8">
          <Logo isLink={false} />
        </div>
        <LoginForm
          isModal={isModal}
          relays={relays}
          preferedSource={preferedSource}
        />
      </div>
    </div>
  );
}

function parseRelays(relays: string[]) {
  return relays?.map((relay) => {
    return {
      label: relay.replace("wss://", ""),
      value: relay,
    };
  });
}
