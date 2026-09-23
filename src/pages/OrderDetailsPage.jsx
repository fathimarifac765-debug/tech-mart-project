function OrderDetailsPage() {

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const order = orders[orders.length - 1];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        padding: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#8b5cf6",
          marginBottom: "30px",
        }}
      >
        Order Details
      </h1>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "12px",
          color: "black",
          
        }}
      >
        <h2 style={{color:"black",fontSize:"20px"}}>Order #{order?.orderId}</h2>

        <p>
          <strong>Products:</strong>
        </p>

        {order?.items?.map((item) => (
          <p key={item.id}>
            {item.name} × {item.quantity}
          </p>
        ))}

        <p>
          <strong>Total Price:</strong> ₹
          {order?.totalAmount?.toLocaleString()}
        </p>

        <p>
          <strong>Status:</strong> {order?.status}
        </p>

        <p>
          <strong>Payment Method:</strong>{" "}
          {order?.paymentMethod}
        </p>

        <p>
          <strong>Order Date:</strong>{" "}
          {order?.orderDate}
        </p>

        <p>
          <strong>Estimated Delivery:</strong>{" "}
          {order?.estimatedDelivery}
        </p>

        <p>
          <strong>Customer Name:</strong>{" "}
          {order?.customerName}
        </p>

        <p>
          <strong>Phone:</strong> {order?.phone}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {order?.address}
        </p>
      </div>
    </div>
  );
}

export default OrderDetailsPage;