"use client";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

export function Avatar({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <RadixAvatar.Root className={cn("inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700", className)}>{children}</RadixAvatar.Root>;
}

export function AvatarImage(props: React.ComponentProps<typeof RadixAvatar.Image>) {
  return <RadixAvatar.Image className="h-full w-full rounded-full object-cover" {...props} />;
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <RadixAvatar.Fallback className="h-full w-full rounded-full flex items-center justify-center">{children}</RadixAvatar.Fallback>;
}
