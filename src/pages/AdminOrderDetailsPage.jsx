import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AdminOrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!order) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#EFF6FF",
        padding: "50px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "42px",
          fontWeight: "800",
          color: "#2563EB",
          marginBottom: "30px",
        }}
      >
        Order Details
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "700px",
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
            textAlign: "center",
            borderTop: "6px solid #2563EB",
          }}
        >
          <p
            style={{
              fontSize: "19px",
              color: "#334155",
              margin: "15px 0",
            }}
          >
            <strong>Order ID:</strong> {order.orderId}
          </p>

          <p
            style={{
              fontSize: "19px",
              color: "#334155",
              margin: "15px 0",
            }}
          >
            <strong>Customer:</strong> {order.customerName}
          </p>

          <p
            style={{
              fontSize: "19px",
              color: "#334155",
              margin: "15px 0",
            }}
          >
            <strong>Phone:</strong> {order.phone}
          </p>

          <p
            style={{
              fontSize: "19px",
              color: "#334155",
              margin: "15px 0",
            }}
          >
            <strong>Address:</strong> {order.address}
          </p>

          <p
            style={{
              fontSize: "19px",
              color: "#334155",
              margin: "15px 0",
            }}
          >
            <strong>Total Amount:</strong> ₹
            {order.totalAmount || order.total}
          </p>

          <p
            style={{
              fontSize: "19px",
              color: "#334155",
              margin: "15px 0",
            }}
          >
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>

          <p
            style={{
              fontSize: "19px",
              color: "#334155",
              margin: "15px 0",
            }}
          >
            <strong>Status:</strong> {order.status}
          </p>

          <p
            style={{
              fontSize: "19px",
              color: "#334155",
              margin: "15px 0",
            }}
          >
            <strong>Order Date:</strong>{" "}
            {order.orderDate || "Not Available"}
          </p>

          <p
            style={{
              fontSize: "19px",
              color: "#334155",
              margin: "15px 0",
            }}
          >
            <strong>Estimated Delivery:</strong>{" "}
            {order.estimatedDelivery || "Not Available"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetailsPage;