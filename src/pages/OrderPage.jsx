import { useNavigate } from "react-router-dom";

function OrderPage() {
  const navigate = useNavigate();

 const orders =
     JSON.parse(localStorage.getItem("orders")) || [];
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        padding: "40px 20px",
      }}
    >
      {/* Page Title */}
      <h1
        style={{
          textAlign: "center",
          color: "#8b5cf6",
          margin: "0 0 30px",
          fontSize: "32px",
        }}
      >
        My Orders
      </h1>

      {/* Order Card */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          {orders.map((order)=> (
            <div
            key={order.orderId}
            style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "25px",
          marginBottom:"20px"
            }}>
      
        <h2
          style={{
            margin: "0 0 20px",
            color: "#111827",
          }}
        >
          Order #{order.orderId}
        </h2>

        
          <strong>Product:</strong> 
          {order.items?.map((item)=>(
            <p key={item.id}>
              {item.name}*{item.quantity}
            </p>
          ))}
        

        <p
          style={{
            margin: "0 0 10px",
            color: "#374151",
          }}
        >
          <strong>Price:</strong> ₹{order.totalAmount?.toLocaleString()}
        </p>

        <p
          style={{
            margin: "0 0 10px",
            color: "#374151",
          }}
        >
          <strong>Order Date:</strong> {order.orderDate}
        </p>

        <p
          style={{
            margin: "0 0 20px",
            color: "#16a34a",
            fontWeight: "600",
          }}
        >
          <strong>Status:</strong> {order.status}
        </p>

        <button
        onClick={()=>navigate("/order-details")}
          style={{
            padding: "11px 24px",
            backgroundColor: "#7b2ff7",
            color: "#ffffff",
            border: "none",
            borderRadius: "7px",
            cursor: "pointer",
          }}
        >
          View Details
        </button>
        
      </div>
          ))}
        </div>  
    </div>
  );
}

export default OrderPage;