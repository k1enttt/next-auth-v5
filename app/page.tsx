import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {

  return (
    <main className="flex h-full flex-col items-center justify-center bg-cyan-500">
      <div className="space-y-6 text-center">
        <h1 className={cn(
          "text-white font-bold text-6xl", 
          font.className
          )}>
          🐣 Auth
        </h1>
        <p className="text-white text-lg">
          Đây là form login nè, nhớ làm cho nó đẹp đẹp nha, đừng để nó xấu xí
        </p>
        <LoginButton mode="modal" asChild>
          <Button>  
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
