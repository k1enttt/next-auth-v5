"use client";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { logout } from "@/actions/logout";
import { settings } from "@/actions/setting";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SettingSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const SettingPage = () => {
  const user = useCurrentUser();

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      name: user?.name || undefined,
    },
  });

  const handleSubmit = (values: z.infer<typeof SettingSchema>) => {
    startTransition(async () => {
      await settings(values)
        .then((response) => {
          if (response.error) {
            setError(response.error);
          }
          if (response.success) {
            update();
            setSuccess(response.success);
          }
        })
        .catch((error) => {
          setError("Something went wrong!\n" + error.message);
        });
    });
  };

  const onClick = () => {
    logout();
  };
  return (
    <div>
      <Card className="w-[600px]">
        <CardHeader className="font-bold">
          <p className="font-semibold text-2xl text-center">🛠️Settings</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="space-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Trung Kien"
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>
              <Button disabled={isPending} type="submit">
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <button
        className="bg-white p-6 rounded-2xl"
        onClick={onClick}
        type="submit"
      >
        Sign out
      </button>
    </div>
  );
};

export default SettingPage;
