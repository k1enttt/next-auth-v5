import { RegisterSchema } from '@/schemas/index';
import {z} from 'zod';

export const register = async (values : z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid fields!"};
    }
    return {success: "Login success!"};
};