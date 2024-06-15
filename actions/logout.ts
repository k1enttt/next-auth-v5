'use server';
import { signOut } from "@/auth"

export const logout = async (
    callbackUrl?: string
) => {
    // Some server actions
    const redirectUrl = callbackUrl ? `?callbackUrl=${callbackUrl}` : "";
    await signOut({redirectTo: `/auth/login${redirectUrl}`});
}