import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";


function AdminLayout({ children }) {

    const [isSidebarOpen,setIsSidebarOpen] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <AdminSidebar />

      <div
        style={{
          flex: 1,
          backgroundColor: "#f8fafc",
          marginLeft:"300px"
        }}
      >
       
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;