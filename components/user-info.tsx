import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExtendedUser } from "@/next-auth";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  label: string;
  user?: ExtendedUser;
}

export const UserInfo = ({ label, user} : UserInfoProps) => {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          {label}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between p-3 rounded-lg border shadow-md">
          <p className="text-sm font-medium">
            ID
          </p>
          <p className="truncate text-xs max-w-[180px] p-1 bg-slate-100 font-mono">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between p-3 rounded-lg border shadow-md">
          <p className="text-sm font-medium">
            Name
          </p>
          <p className="truncate text-xs max-w-[180px] p-1 bg-slate-100 font-mono">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between p-3 rounded-lg border shadow-md">
          <p className="text-sm font-medium">
            Email
          </p>
          <p className="truncate text-xs max-w-[180px] p-1 bg-slate-100 font-mono">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between p-3 rounded-lg border shadow-md">
          <p className="text-sm font-medium">
            Role
          </p>
          <p className="truncate text-xs max-w-[180px] p-1 bg-slate-100 font-mono">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between p-3 rounded-lg border shadow-md">
          <p className="text-sm font-medium">
            Two Factor Authentication
          </p>
          <Badge
            variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
