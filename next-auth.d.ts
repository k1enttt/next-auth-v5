import { UserRole } from "@prisma/client";
import auth, { DefaultSession, type DefaultSe} from "next-auth";

export type ExtendedUser = DefaultSession['user'] & {
    role: UserRole;
    isTwoFactorEnabled: Boolean;
}

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
    }
}