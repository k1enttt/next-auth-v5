"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary p-4 rounded-xl flex gap-x-2 items-center justify-between w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          variant={pathname === "/server" ? "default" : "outline"}
          asChild
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          variant={pathname === "/client" ? "default" : "outline"}
          asChild
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button 
          variant={pathname === "/admin" ? "default" : "outline"} 
          asChild>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          variant={pathname === "/settings" ? "default" : "outline"}
          asChild
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <p className="">User button</p>
    </nav>
  );
};
