'use server';
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>, 
    token?: string | null) => {

    if (!token) {
        return {error: "Missing token!", success: ""};
    }

    const validateField = NewPasswordSchema.safeParse(values);
    if (!validateField.success) {
        return {error: "Invalid fields!", success: ""};
    }

    const { password } = validateField.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return {error: "Invalid token!", success: ""};
    }

    const tokenExpired = new Date(existingToken.expires) < new Date();
    if (tokenExpired) {
        return {error: "Token has expired!", success: ""};
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return {error: "User does not exist!", success: ""};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
        where: { id: existingToken.id },
    });

    return {success: "Password updated!", error: ""};
};