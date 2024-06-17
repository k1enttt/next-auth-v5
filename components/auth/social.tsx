import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export const Social = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || undefined;

    const onClick = (provider: "google" | "github") =>
        signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });

    return (
        <div className="w-full flex gap-x-4 items-center">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => onClick("google")}
            >
                <FcGoogle className="w-6 h-6" />
            </Button>
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => onClick("github")}
            >
                <FaGithub className="w-6 h-6" />
            </Button>
        </div>
    );
};
