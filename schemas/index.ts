import { z } from "zod";

export const SettingSchema = z.object({
  name: z.optional(z.string())
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required"
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(1, {
    message: "Password is required"
  }),
  code: z.optional(z.string().min(6, {
    message: "Two factor code must be 6 characters.",
  })), // 2FA code
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required"
  }),
  name: z.string().min(1, {
    message: "Name is required"
  }),
});