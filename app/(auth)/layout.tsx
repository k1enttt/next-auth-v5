import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="bg-orange-500 text-white">This is auth layout</div>
      {children}
    </div>
  );
};

export default AuthLayout;
