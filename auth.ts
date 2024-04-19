import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
    callbacks: {
        async jwt({ token }) {
            console.log(token);
            return token;
        },

        async session({ session, token }) {
            console.log({
                session: session,
                token: token,
            });
            return session;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
