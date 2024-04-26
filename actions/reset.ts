'use server';
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (value: z.infer<typeof ResetSchema>) => {
    const validateField = ResetSchema.safeParse(value);

    if (!validateField.success) {
        return {error: "Invalid fields!", success: ""};
    }

    const {email} = validateField.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {error: "User does not exist!", success: ""};
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email, 
        passwordResetToken.token
    );

    return {success: "Reset email sent!", error: ""};
};