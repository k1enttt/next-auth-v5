'use client';
import { useCurrentRole } from "@/hooks/use-current-role";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { admin } from "@/actions/admin";
const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch('/api/admin')
      .then((res) => {
        if (res.ok) {
          toast.success('API Route success');
        } else {
          toast.error('API Route failed');
        }
      })
  }

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.success);
      } 
      if (data.error) {
        toast.error(data.error);
      }
    })
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="font-semibold text-2xl text-center">👑Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRoles={UserRole.ADMIN}>
          <FormSuccess message="You are an admin." />
        </RoleGate>
        <div className="flex flex-row items-center justify-between border rounded-md shadow-sm p-3">
          <div>
            Admin-only API Route
          </div>
          <Button onClick={onApiRouteClick}>
            Click to test
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between border rounded-md shadow-sm p-3">
          <div>
            Admin-only Server Action
          </div>
          <Button onClick={onServerActionClick}>
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;