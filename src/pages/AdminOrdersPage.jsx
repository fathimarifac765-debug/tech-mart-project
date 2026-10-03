import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setOrders } from "../redux/ordersSlice";
import AdminLayout from "../layouts /AdminLayout";
import { useNavigate } from "react-router-dom";

function AdminOrdersPage() {
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const orders = useSelector((state)=>state.orders.orders)

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortOrders,setSortOrders] = useState("default")

  const [currentPage, setCurrentPage] = useState(1);
   const ordersPerPage = 5;

   useEffect(() => {
   setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((data) => dispatch(setOrders(data)))
      .catch((error) => console.log(error));
  }, [dispatch]);

  const totalOrders = orders.length;

  const updateStatus = (id, newStatus) => {
  fetch(`http://localhost:3000/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: newStatus,
    }),
  })
    .then((res) => res.json())
    .then((updatedOrder) => {
     const updatedOrders = orders.map((order) =>
      order.id === updatedOrder.id ? updatedOrder : order
    );

    dispatch(setOrders(updatedOrders));
  })
    .catch((error) => console.log(error));
};

  const filteredOrders = orders.filter((order) => {
  const matchesSearch =
    order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All Status" ||
    order.status === statusFilter;

  return matchesSearch && matchesStatus;
});

const sortedOrders = [...filteredOrders].sort((a,b)=>{
    const totalA = Number(a.total || a.totalAmount || 0);
    const totalB = Number(b.total || b.totalAmount || 0);

    if(sortOrders === "lowToHigh"){
        return totalA - totalB
    }
    if(sortOrders === "highToLow"){
        return totalB - totalA
    }
    return 0
})

   const indexOfLastOrder = currentPage * ordersPerPage;
   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

   const currentOrders = sortedOrders.slice(
     indexOfFirstOrder,
    indexOfLastOrder
    );

    const totalPages = Math.ceil(
     filteredOrders.length / ordersPerPage
    );

  const thStyle = {
    padding: "15px",
    backgroundColor: "#EEF2FF",
    color: "#475569",
    textAlign: "left",
    borderBottom: "2px solid #E2E8F0",
  };

  const tdStyle = {
    padding: "15px",
    borderBottom: "1px solid #E2E8F0",
  };

  return (
    <AdminLayout>
      <div
        style={{
          padding: "40px",
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            color: "#1E293B",
            fontWeight: "800",
          }}
        >
          Order Management
        </h1>

        <p
          style={{
            color: "#64748B",
            marginBottom: "25px",
          }}
        >
          Manage and track customer orders
        </p>

        {/* Total Orders Card */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            marginBottom: "25px",
            width: "250px",
          }}
        >
          <h3>Total Orders</h3>

          <h1
            style={{
              color: "#7b2ff7",
              marginTop: "10px",
            }}
          >
            {totalOrders}
          </h1>
        </div>

        {/* Search & Filter */}
            <div
       style={{
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    gap: "25px",
  }}
>
  <input
    type="text"
    placeholder="Search Order ID or Customer"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      width: "750px",
      padding: "14px",
      border: "1px solid #CBD5E1",
      borderRadius: "10px",
      fontSize: "16px",
    }}
  />

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }}
  >
    <span
      style={{
        fontSize: "16px",
        fontWeight: "600",
        color: "#334155",
        whiteSpace: "nowrap",
      }}
    >
      Filter Status
    </span>

    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      style={{
        width: "100px",
        height:"52px",
        padding: "0px 20px",
        border: "1px solid #CBD5E1",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        backgroundColor: "white",
      }}
    >
      <option>All Status</option>
      <option>Pending</option>
      <option>Confirmed</option>
      <option>Shipped</option>
      <option>Delivered</option>
      <option>Cancelled</option>
    </select>

    <select
    
    value={sortOrders}
    onChange={(e)=>setSortOrders(e.target.value)}
        style={{
        width: "100px",
        height:"52px",
        padding: "0px 20px",
        border: "1px solid #CBD5E1",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        backgroundColor: "white",
      }}>
        <option value="default">Sort By Total</option>
        <option value="lowToHigh">Total-Low to High</option>
        <option value="highTOLow">Total - High to Low</option>
    </select>
  </div>



        </div>

        {/* Orders Table */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>Customer Name</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Items</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Payment</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
  {currentOrders.length > 0 ? (
    currentOrders.map((order) => (
      <tr key={order.id}>
        <td style={tdStyle}>{order.orderId}</td>

        <td style={tdStyle}>
          {order.customerName}
        </td>

        <td style={tdStyle}>
          {order.phone}
        </td>

        <td style={tdStyle}>
          {order.items?.length}
        </td>

        <td style={tdStyle}>
          ₹{order.total || order.totalAmount}
        </td>

        <td style={tdStyle}>
          {order.paymentMethod}
        </td>

        <td style={tdStyle}>
          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(order.id, e.target.value)
            }
            style={{
              width: "130px",
              height: "52px",
              padding: "0px 20px",
              borderRadius: "8px",
              border: "1px solid #CBD5E1",
              fontSize: "15px",
              cursor: "pointer",
              backgroundColor: "white",
              textAlign: "center",
              textAlignLast: "center",
            }}
          >
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </td>

        <td style={tdStyle}>
          <button
            onClick={() =>
              navigate(`/admin/order-details/${order.id}`)
            }
            style={{
              backgroundColor: "#7b2ff7",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            View
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="8"
        style={{
          padding: "40px",
          textAlign: "center",
          color: "#64748B",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        No orders found
      </td>
    </tr>
  )}
</tbody>
          </table>
             {filteredOrders.length > 0 && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "15px",
      marginTop: "25px",
    }}
  >
    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
      style={{
        padding: "10px 18px",
        borderRadius: "8px",
        border: "1px solid #CBD5E1",
        backgroundColor: "white",
        cursor: currentPage === 1 ? "not-allowed" : "pointer",
      }}
    >
      Previous
    </button>

    <span
      style={{
        fontSize: "15px",
        fontWeight: "500",
        color: "#334155",
      }}
    >
      Page {currentPage} of {totalPages}
    </span>

    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      style={{
        padding: "10px 18px",
        borderRadius: "8px",
        border: "1px solid #CBD5E1",
        backgroundColor: "white",
        cursor:
          currentPage === totalPages ? "not-allowed" : "pointer",
      }}
    >
      Next
    </button>
  </div>
)}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminOrdersPage;