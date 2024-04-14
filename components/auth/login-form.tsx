"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const LoginForm = () => {
  // 1. Khai báo form với kiểu dữ liệu từ LoginSchema
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Khai báo hàm handleSubmit
  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Dont have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6">
          <div className="space-y-4">
            <FormField
            control={form.control}
            name="email"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="abc@gmail.com" {...field} type="email"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />

            <FormField
            control={form.control}
            name="password"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input placeholder="********" {...field} type="password"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />

          </div>

            <FormError message="" />
            <FormSuccess message="" />

            <Button
              type="submit"
              className="w-full">
              Login
            </Button>
        </form>
      </Form>
      {
        // Action file
        // useTransition
      }
    </CardWrapper>
  );
};
