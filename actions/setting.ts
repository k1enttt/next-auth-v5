'use server'
import * as z from "zod"
import bcrypt, { hash } from "bcryptjs"

import {SettingSchema} from "@/schemas"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"


export const settings = async (
  values: z.infer<typeof SettingSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return {error: "Unauthorized"}
  }
  
  if (!user.id) {
    return {error: "Unauthorized"}
  }
  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return {error: "Unauthorized"};
  }

  // Nếu user đăng nhập bằng OAuth (Google hay GitHub) thì 
  // không cho phép thay đổi email, password, new password, isTwoFactorEnabled
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== dbUser.email) {
    const existingUser = await db.user.findUnique({
      where: { email: values.email },
    });

    if (existingUser) {
      return {error: "Email already exists"}
    }

    const verificationToken = await generateVerificationToken(
      values.email
    );

    await sendVerificationEmail(
      values.email,
      verificationToken.token
    );
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return {error: "Incorrect password"};
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id},
    data: {
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
      isTwoFactorEnabled: values.isTwoFactorEnabled,
    },
  });
  
  return {success: "Setting Updated"}
}