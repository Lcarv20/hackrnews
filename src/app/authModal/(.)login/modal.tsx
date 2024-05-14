"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Dialog defaultOpen={true} onOpenChange={(value) => {
      router.back();
    }}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
