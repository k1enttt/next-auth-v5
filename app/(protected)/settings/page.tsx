"use client";
import { useTransition } from "react";
import { logout } from "@/actions/logout";
import { settings } from "@/actions/setting";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

const SettingPage = () => {
  const { update } = useSession();
  const [pending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () =>  {
      await settings({
        name: "Trung Kiên",
      }).then(() => {
        update();
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
          <p className="font-semibold text-2xl text-center">
            🛠️Settings
          </p>
        </CardHeader>
        <CardFooter>
          <Button disabled={pending} onClick={handleSubmit}>Update</Button>
        </CardFooter>
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
