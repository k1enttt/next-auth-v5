'use client';
import { useCurrentRole } from "@/hooks/use-current-role";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { FormSuccess } from "@/components/form-success";

const AdminPage = () => {
  const role = useCurrentRole();
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="font-semibold text-2xl text-center">👑Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRoles={UserRole.ADMIN}>
          <FormSuccess message="You are an admin." />
        </RoleGate>
      </CardContent>
    </Card>
  );
};

export default AdminPage;