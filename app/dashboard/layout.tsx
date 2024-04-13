import React from "react";

const DashboardLayout = ({children} : {children : React.ReactNode}) => {
    return ( <div>
        <nav className="bg-black text-white">
            This is dashboard navbar
        </nav>
        {children}
    </div> );
}
 
export default DashboardLayout;