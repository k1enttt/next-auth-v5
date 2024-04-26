'use server';
import { getUserByEmail } from "@/data/user";
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

    // TODO: Create token and send reset email

    return {success: "Reset email sent!", error: ""};
};