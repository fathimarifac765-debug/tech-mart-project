import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import {
  MdInventory,
  MdShoppingCart,
  MdPeople,
  MdCurrencyRupee,
} from "react-icons/md";

import AdminLayout from "../layouts /AdminLayout";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AdminDashboardPage() {
    const navigate = useNavigate();

  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const [orders,setOrders] = useState([]);
  const [products,setProducts] = useState([]);

  const  [revenueData,setRevenueData] = useState([]);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          productsResponse,
          usersResponse,
          ordersResponse,
        ] = await Promise.all([
          axios.get("http://localhost:3000/products"),
          axios.get("http://localhost:3000/users"),
          axios.get("http://localhost:3000/orders"),
        ]);

        setProductCount(productsResponse.data.length);
        setUserCount(usersResponse.data.length);
        setOrderCount(ordersResponse.data.length);

        setProducts(productsResponse.data);
        setOrders(ordersResponse.data);

        const totalRevenue = ordersResponse.data.reduce(
          (total, order) =>
            total + Number(order.totalAmount || 0),
          0
        );

        setRevenue(totalRevenue);

        const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthlyRevenue = {};

ordersResponse.data.forEach((order) => {
  const parts = order.orderDate.split("-");

  const monthIndex = Number(parts[1]) - 1;

  const month = monthNames[monthIndex];

  monthlyRevenue[month] =
    (monthlyRevenue[month] || 0) +
    Number(order.totalAmount || order.total || 0);
});

const chartData = monthNames.map((month) => ({
  month,
  revenue: monthlyRevenue[month] || 0,
}));

setRevenueData(chartData);
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  

  return (
    <AdminLayout>
      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
          background:
            "linear-gradient(135deg,#E0E7FF,#EEF2FF,#F8FAFC)",
        }}
      >
        <div style={{ marginBottom: "35px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "48px",
              fontWeight: "800",
              color: "#0F172A",
            }}
          >
            Welcome Admin 👋
          </h1>

          <p
            style={{
              marginTop: "10px",
              fontSize: "18px",
              color: "#64748B",
            }}
          >
            Manage products, orders and customers from one dashboard.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
        {/* Products */}
<div
  style={{
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "30px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    }}
  >
    <div>
      <p
        style={{
          margin: 0,
          color: "#64748B",
          fontSize: "17px",
          fontWeight: "600",
        }}
      >
        Products
      </p>

      <h1
        style={{
          margin: "12px 0",
          fontSize: "46px",
          color: "#0F172A",
        }}
      >
        {productCount}
      </h1>

      <p style={{ margin: 0, color: "#94A3B8" }}>
        Active Products
      </p>
    </div>

    <div
      style={{
        width: "52px",
        height: "52px",
        borderRadius: "14px",
        background: "#DBEAFE",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MdInventory size={24} color="#2563EB" />
    </div>
  </div>
</div>

{/* Orders */}
<div
  style={{
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "30px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    }}
  >
    <div>
      <p
        style={{
          margin: 0,
          color: "#64748B",
          fontSize: "17px",
          fontWeight: "600",
        }}
      >
        Orders
      </p>

      <h1
        style={{
          margin: "12px 0",
          fontSize: "46px",
          color: "#0F172A",
        }}
      >
        {orderCount}
      </h1>

      <p style={{ margin: 0, color: "#94A3B8" }}>
        Customer Orders
      </p>
    </div>

    <div
      style={{
        width: "52px",
        height: "52px",
        borderRadius: "14px",
        background: "#FEF3C7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MdShoppingCart size={24} color="#F59E0B" />
    </div>
  </div>
</div>

{/* Customers */}
<div
  style={{
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "30px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    }}
  >
    <div>
      <p
        style={{
          margin: 0,
          color: "#64748B",
          fontSize: "17px",
          fontWeight: "600",
        }}
      >
        Customers
      </p>

      <h1
        style={{
          margin: "12px 0",
          fontSize: "46px",
          color: "#0F172A",
        }}
      >
        {userCount}
      </h1>

      <p style={{ margin: 0, color: "#94A3B8" }}>
        Active Customers
      </p>
    </div>

    <div
      style={{
        width: "52px",
        height: "52px",
        borderRadius: "14px",
        background: "#DCFCE7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MdPeople size={24} color="#10B981" />
    </div>
  </div>
</div>

{/* Revenue */}
<div
  style={{
    background: "#FFFFFF",
    borderRadius: "24px",
    padding: "30px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    }}
  >
    <div>
      <p
        style={{
          margin: 0,
          color: "#64748B",
          fontSize: "17px",
          fontWeight: "600",
        }}
      >
        Revenue
      </p>

      <h1
        style={{
          margin: "12px 0",
          fontSize: "40px",
          color: "#0F172A",
        }}
      >
        ₹{revenue}
      </h1>

      <p style={{ margin: 0, color: "#94A3B8" }}>
        From All Orders
      </p>
    </div>

    <div
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "12px",
        background: "#DCFCE7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MdCurrencyRupee
        size={18}
        color="#22C55E"
      />
    </div>
  </div>
</div>

</div>
<div
  style={{
    marginTop: "30px",
  }}
>
  <div
    style={{
      background: "#FFFFFF",
      borderRadius: "24px",
      padding: "30px",
      border: "1px solid #E2E8F0",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      minHeight: "500px",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <div>
        <h3
          style={{
            margin: 0,
            color: "#0F172A",
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          Monthly Revenue
        </h3>

        <p
          style={{
            marginTop: "6px",
            color: "#64748B",
            fontSize: "14px",
          }}
        >
          Revenue generated from orders
        </p>
      </div>

      <button
        style={{
          border: "none",
          background: "#EEF2FF",
          color: "#4338CA",
          padding: "10px 18px",
          borderRadius: "12px",
          fontWeight: "600",
        }}
      >
        Monthly
      </button>
    </div>

    <ResponsiveContainer
      width="100%"
      height={380}
    >
      <AreaChart data={revenueData}>
        <defs>
          <linearGradient
            id="colorRevenue"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#2563EB"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="#2563EB"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          ticks={[
            0,
            5000,
            10000,
            15000,
            20000,
            25000,
            30000,
            35000,
          ]}
        />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#2563EB"
          strokeWidth={4}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
</div>
<div
  style={{
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  }}
>
  {/* Recent Orders */}

  <div
    style={{
      background: "#FFFFFF",
      borderRadius: "24px",
      padding: "24px",
      border: "1px solid #E2E8F0",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "#0F172A",
        }}
      >
        Recent Orders
      </h3>

      <button
      onClick={()=>navigate("/admin/orders")}
        style={{
          background: "#2563EB",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        View All
      </button>
    </div>

    <div
      style={{
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          minWidth: "500px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#334155",
              color: "#fff",
            }}
          >
            <th
              style={{
                padding: "12px",
                textAlign: "left",
              }}
            >
              Order ID
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "left",
              }}
            >
              Customer
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "left",
              }}
            >
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {orders
            .slice(-5)
            .reverse()
            .map((order) => (
              <tr
                key={order.id}
                style={{
                  borderBottom:
                    "1px solid #E5E7EB",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {order.orderId}
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {order.customerName}
                </td>

                <td
                  style={{
                    padding: "12px",
                    fontWeight: "600",
                  }}
                >
                  ₹{order.totalAmount || order.total}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Recent Products */}

  <div
    style={{
      background: "#FFFFFF",
      borderRadius: "24px",
      padding: "24px",
      border: "1px solid #E2E8F0",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "#0F172A",
        }}
      >
        Recent Products
      </h3>

      <button
      onClick={()=> navigate("/admin/products")}
        style={{
          background: "#2563EB",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        View All
      </button>
    </div>

    <div
      style={{
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          minWidth: "500px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#334155",
              color: "#fff",
            }}
          >
            <th
              style={{
                padding: "12px",
                textAlign: "left",
              }}
            >
              Product
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "left",
              }}
            >
              Category
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "left",
              }}
            >
              Price
            </th>
          </tr>
        </thead>

        <tbody>
          {products
            .slice(-5)
            .reverse()
            .map((product) => (
              <tr
                key={product.id}
                style={{
                  borderBottom:
                    "1px solid #E5E7EB",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />

                    <span>
                      {product.name}
                    </span>
                  </div>
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {product.category}
                </td>

                <td
                  style={{
                    padding: "12px",
                    fontWeight: "600",
                  }}
                >
                  ₹{product.price}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

      </div>
    </AdminLayout>
  );
}

export default AdminDashboardPage;