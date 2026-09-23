import { useNavigate } from "react-router-dom";



function OrderSuccessPage() {
  const navigate = useNavigate();

  const orderData = 
  JSON.parse(localStorage.getItem("orderData")) || {};
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "40px",
          textAlign: "center",
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            width: "70px",
            height: "70px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
          }}
        >
          ✓
        </div>

        {/* Success Message */}
        <h1
          style={{
            color: "#111827",
            margin: "0 0 10px",
            fontSize:"32px",
            lineHeight:"1.3",
            fontWeight:"600"
          }}
        >
          Order Placed Successfully!
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "30px",
          }}
        >
          Thank you for shopping with TechMart
        </p>

        {/* Order Details */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "left",
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              margin: "0 0 12px",
              color: "#374151",
            }}
          >
            <strong>Order ID:</strong> {orderData.orderId}
          </p>

          <p
            style={{
              margin: 0,
              color: "#374151",
            }}
          >
            <strong>Estimated Delivery:</strong> {orderData.estimatedDelivery}
          </p>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <button
          onClick={()=> navigate("/")}
            style={{
              padding: "12px 24px",
              backgroundColor: "#7b2ff7",
              color: "#ffffff",
              border: "none",
              borderRadius: "7px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Continue Shopping
          </button>

          <button
          onClick={()=> navigate("/orders")}
            style={{
              padding: "12px 24px",
              backgroundColor: "#ffffff",
              color: "#7b2ff7",
              border: "1px solid #7b2ff7",
              borderRadius: "7px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;