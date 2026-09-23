import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

function Navbar({
   searchTerm,
   setSearchTerm,
   sortOrder,
   setSortOrder,
   productsRef,
}){
     const navigate = useNavigate();

     const [user,setUser]=useState(null)

     useEffect(() => {
      const savedUser = JSON.parse(
      localStorage.getItem("user")
  );

  if (savedUser) {
    setUser(savedUser);
  }
  }, []);

   const cartItems = useSelector(
     (state) => state.cart.items
   );


  const cartCount = cartItems.reduce(
 (total, item) => total + item.quantity,
   0);

   const wishlistItems = useSelector(
    (state)=>state.wishlist.items
   );

   const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null);
  navigate("/login");
  };

  return (
    <>
      {/* Top Information Bar */}
      <div
        style={{
          backgroundColor: "#0b2a4a",
          color: "#ffffff",
          padding: "8px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "13px",
        }}
      >
        <span>🚚 Free Delivery on orders above ₹499</span>
        <span>◉ 7 Days Easy Returns</span>
        <span>📱 Download App</span>
        <span>♙ Become a Seller</span>
        <span>◷ Help & Support</span>
      </div>

      {/* Main Navbar */}
      <nav
        style={{
          backgroundColor: "#ffffff",
          padding: "8px 60px",
          display: "flex",
          alignItems: "center",
          gap: "30px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: "700",
            whiteSpace: "nowrap",
            minWidth: "190px",
          }}
        >
          <span style={{ color: "#2563eb" }}>🛍️ Tech</span>
          <span style={{ color: "#111827" }}>Mart</span>
        </div>

        {/* Search Bar */}
        <div
          style={{
            flex: 1,
            display: "flex",
            minWidth: "300px",
          }}
        >
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "13px 18px",
              border: "1px solid #d1d5db",
              borderRight: "none",
              borderRadius: "6px 0 0 6px",
              outline: "none",
              fontSize: "14px",
            }}
          />

          <button
          onClick={()=>{
            productsRef.current?.scrollIntoView({
              behavior:"smooth",
              block:"start"
            })
          }}
            style={{
              width: "60px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "0 6px 6px 0",
              fontSize: "19px",
              cursor: "pointer",
            }}
          >
            🔍
          </button>
          <select 
          value={sortOrder}
          onChange={(e)=>setSortOrder(e.target.value)}
          style={{
            marginLeft:"10px",
            padding:"12px",
            border:"1px solid #d1d5db",
            borderRadius:"6px"
          }}>
           <option value="">Sort</option>
           <option value="lowToHigh">Price Low to High</option>
           <option value="highToLow">Price High to Low</option>
          </select>
        </div>

        {/* Login / Wishlist / Cart */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
            whiteSpace: "nowrap",
          }}
        >
          {/* Login */}
         {
  user ? (
    <>
      <span
        style={{
          color: "#2563eb",
          fontWeight: "600",
        }}
      >
        {user.email}
      </span>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <button
      onClick={() => navigate("/login")}
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "7px",
        fontSize: "14px",
        color: "#111827",
        fontWeight: "500",
      }}
    >
      <span style={{ fontSize: "22px" }}>👤</span>
      <span>Login / Register</span>
    </button>
  )
}

          {/* Wishlist */}
          <button
          onClick={()=>navigate("/wishlist")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "14px",
              color: "#111827",
              fontWeight: "500",
              position: "relative",
            }}
          >
            <span style={{ fontSize: "25px" }}>♡</span>
            <span>Wishlist</span>

            <span
              style={{
                position: "absolute",
                top: "-8px",
                left: "14px",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {wishlistItems.length}
            </span>
          </button>

          {/* Cart */}
          <button
          onClick={()=> navigate("/cart")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "14px",
              color: "#111827",
              fontWeight: "500",
              position: "relative",
            }}
          >
            <span style={{ fontSize: "23px" }}>🛒</span>
            <span>Cart</span>

            <span
              style={{
                position: "absolute",
                top: "-8px",
                left: "15px",
                backgroundColor: "#f59e0b",
                color: "#ffffff",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </nav>

     
     
    </>
  );
}

export default Navbar;