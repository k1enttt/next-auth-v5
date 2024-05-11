"use client";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };
  return (
    <div>
      {JSON.stringify(user)}
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
