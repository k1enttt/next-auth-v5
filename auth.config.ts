import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";
import bcryptjs from "bcryptjs";
import { db } from "./lib/db";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validatedFields = await LoginSchema.safeParse(
                    credentials
                );

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) {
                        return null;
                    } // Người dùng không có mật khẩu khi login bằng Google hay GitHub

                    const passwordsMatch = await bcryptjs.compare(
                        password,
                        user.password
                    );
                    if (passwordsMatch) {
                        return user;
                    }
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
