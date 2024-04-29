"use server";
import {z} from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid fields!", success: ""};
    }

    const {email, password} = validateFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "User does not exist!", success: ""};
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);

        // Sent the verification email
        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return {success: "Confirmation email sent!", error: ""};

    }

    // Send two factor authentication code
    if (existingUser.isTwoFacctorEnabled && existingUser.email) {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        await sendTwoFactorTokenEmail(
            existingUser.email, 
            twoFactorToken.token
        );

        return { twoFactor: true, error: "", success: ""};
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Invalid credentials!", success: ""};
                default:
                    return {error: "An error occurred!", success: ""};
            }
        } 
        throw error;
    }
    

    return {success: "Login success!", error: ""};
};