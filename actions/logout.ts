'use server';
import { signOut } from "@/auth"

export const logout = async () => {
    // Some server actions
    await signOut({redirectTo: '/auth/login'});
}