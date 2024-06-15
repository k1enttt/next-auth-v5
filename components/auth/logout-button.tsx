'use client';
import { logout } from "@/actions/logout";

interface LogoutButtonProps {
children?: React.ReactNode,
}

export const LogoutButton = ({children}:LogoutButtonProps) => {
  const getCallbackUrl = () => {
    const url = window.location.href;
    const domain = window.location.origin;
    const callbackUrl = url.replace(domain, '');
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return encodedCallbackUrl;
  }
  const onClick = () => logout(getCallbackUrl());

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}