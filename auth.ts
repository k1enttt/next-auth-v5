import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
    callbacks: {
        // Ban đầu ta có JWT sau khi đăng nhập
        // JWT bao gồm các thông tin cơ bản của User
        async jwt({ token }) {
            console.log({token: token});
            
            // token.sub does not exit when you log out
            if (!token.sub) return token;
        
            //  User does not exist in the database when you sign up
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            // User exists in the database when you log in
            token.role = existingUser.role;

            return token;
        },

        // Để tạo được một session cần có JWT (JSON Web Token)
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;

            }

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
