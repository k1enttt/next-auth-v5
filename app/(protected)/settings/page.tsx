"use client";
import { logout } from "@/actions/logout";
import { useSession, signOut } from "next-auth/react";
const SettingPage = () => {
  const session = useSession();

  const onClick = () => {
    logout();
  };
  return (
    <div>
      <div>{JSON.stringify(session)}</div>

      <button onClick={onClick} type="submit">
        Sign out
      </button>
    </div>
  );
};

export default SettingPage;
