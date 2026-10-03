import { MdDashboard, MdInventory, MdShoppingCart, MdPeople, MdLogout } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <MdDashboard size={24} />,
      path: "/admin/dashboard",
    },
    {
      name: "Products",
      icon: <MdInventory size={24} />,
      path: "/admin/products",
    },
    {
      name: "Orders",
      icon: <MdShoppingCart size={24} />,
      path: "/admin/orders",
    },
    {
      name: "Users",
      icon: <MdPeople size={24} />,
      path: "/admin/users",
    },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    sessionStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <div
      style={{
        width: "300px",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        background: "linear-gradient(180deg,#1F2937,#111827,#0F172A)",
        display: "flex",
        flexDirection: "column",
        color: "#F8FAFC",
        boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
        fontFamily:"Outfit,sans-serif",
        borderRight:"1px solid rgba(255,255,255,0.06)"
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          padding: "32px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "38px",
            fontWeight: "800",
            color:"#ffffff",
            marginBottom:"8px",
            letterSpacing:"-1px",
            
          }}
        >
           🛍 TechMart
        </h1>

        <p
          style={{
            marginTop: "10px",
            color: "#94a3b8",
            fontSize: "12px",
            letterSpacing: "4px",
          }}
        >
          ADMIN PANEL
        </p>
      </div>

      {/* Menu */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {menuItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 18px",
              borderRadius: "16px",
              cursor: "pointer",
               background:

                location.pathname === item.path
                  ? "linear-gradient(135deg,#1e293b,#334155)"
                  : "transparent",
              border:
                location.pathname === item.path
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid transparent",
              backdropFilter:
                location.pathname === item.path
                  ? "blur(10px)"
                  : "none",
              boxShadow:
                location.pathname === item.path
                  ? "0 10px 30px rgba(0,0,0,0.25)"
                  : "none",

              color: "#FFFFFF",
              fontSize: "17px",
              fontWeight: "600",
              transition: "0.3s",
            }}
          >
            {item.icon}
            {item.name}
          </div>
        ))}
      </div>

      {/* Logout Bottom */}
      <div
        style={{
          marginTop: "auto",
          padding: "20px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "16px 18px",
            borderRadius: "16px",
            cursor: "pointer",
            backgroundColor: "transparent",
            color: "#CBD5E1",
            fontSize: "17px",
            fontWeight: "600",

            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <MdLogout size={24} />
          Logout
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;