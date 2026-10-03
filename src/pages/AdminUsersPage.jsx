import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers,toggleUserStatus } from "../redux/usersSlice";
import AdminLayout from "../layouts /AdminLayout";


function AdminUsersPage() {
  const dispatch = useDispatch();

  const users = useSelector((state)=>state.users.users)

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data)=> dispatch(setUsers(data)))
      .catch((error) => console.log(error));
  }, [dispatch]);
  const handleToggleStatus = async (user) => {
  const updatedStatus =
    user.status === "block"
      ? "unblock"
      : "block";

  try {
    await fetch(
      `http://localhost:3000/users/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: updatedStatus,
        }),
      }
    );

    dispatch(toggleUserStatus(user.id));
  } catch (error) {
    console.log(error);
  }
};

  const totalUsers = users.length;
   const customerUsers = users.filter(
   (user) => user.status === "unblock"
     ).length;
  const blockUsers = users.filter(
  (user) => user.status === "block"
   ).length;

   const filteredUsers = users.filter((user) => {
   const matchesSearch =
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesFilter =
    filterStatus === "all"
      ? true
      : filterStatus === "block"
      ? user.status === "block"
      : user.status === "unblock";

  return matchesSearch && matchesFilter;
});

  return (
    <AdminLayout>
      <div
        style={{
          padding: "40px",
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <h1>User Management</h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
          marginTop: "25px",
          marginBottom: "25px",
         }}>
          <div style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}>
        <h3>Total Users</h3>

        <h1 style={{
           color: "#7b2ff7",
          marginTop: "10px",
          }}>
            {totalUsers}
          </h1>
          </div>

            <div style={{
                backgroundColor: "white",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              }}>
               <h3>Customer Users</h3>

               <h1  style={{
                  color: "#16a34a",
                    marginTop: "10px",
                   }}>
                {customerUsers}
               </h1>
               </div>

                <div style={{
                  backgroundColor: "white",
                  padding: "25px",
                  borderRadius: "15px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  }}>
                   <h3>Blocked Users</h3>

                    <h1  style={{
                        color: "#dc2626",
                        marginTop: "10px",
                   }}>
              {blockUsers}
            </h1>
           </div>          
          </div>
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "15px",
             marginBottom: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            display: "flex",
             alignItems: "center",
             gap: "20px",
           }}>
          <input
             type="text"
             placeholder="Search by Name or Email..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             style={{
               width: "100%",
               padding: "14px",
               border: "1px solid #CBD5E1",
               borderRadius: "10px",
               outline: "none",
               fontSize: "15px",
               }}/>

           <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                width: "150px",
                height:"52px",
                padding: "0px 20px",
                 border: "1px solid #CBD5E1",
                 borderRadius: "10px",
                 fontSize: "16px",
                 fontWeight: "500",
                   cursor: "pointer",
                  backgroundColor: "white",
              }} >
             <option value="all">All Users</option>
            <option value="block">Block Users</option>
            <option value="unblock">Unblock Users</option>
            </select>
            </div>
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
        <th
          style={{
            padding: "15px",
            backgroundColor: "#EEF2FF",
            color: "#475569",
            textAlign: "left",
            borderBottom: "2px solid #E2E8F0",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          User ID
        </th>

        <th
          style={{
            padding: "15px",
            backgroundColor: "#EEF2FF",
            color: "#475569",
            textAlign: "left",
            borderBottom: "2px solid #E2E8F0",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          Name
        </th>

        <th
          style={{
            padding: "15px",
            backgroundColor: "#EEF2FF",
            color: "#475569",
            textAlign: "left",
            borderBottom: "2px solid #E2E8F0",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          Email
        </th>

        <th
          style={{
            padding: "15px",
            backgroundColor: "#EEF2FF",
            color: "#475569",
            textAlign: "left",
            borderBottom: "2px solid #E2E8F0",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          Status
        </th>

        <th
          style={{
            padding: "15px",
            backgroundColor: "#EEF2FF",
            color: "#475569",
            textAlign: "left",
            borderBottom: "2px solid #E2E8F0",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          Action
          </th>
         </tr>
       </thead>
        <tbody>
          {filteredUsers.map((user) => (
  <tr key={user.id}>
    <td
      style={{
        padding: "15px",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      {user.id}
    </td>

    <td
      style={{
        padding: "15px",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      {user.name}
    </td>

    <td
      style={{
        padding: "15px",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      {user.email}
    </td>

    <td
      style={{
        padding: "15px",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      {user.status === "block"
      ? "Blocked" : "Active"}
    </td>

    <td
      style={{
        padding: "15px",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <button
      onClick={()=>handleToggleStatus(user)}
        style={{
          backgroundColor:
            user.status === "block"
              ? "#16a34a"
              : "#dc2626",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {user.status === "block"
          ? "Unblock"
          : "Block"}
      </button>
    </td>
  </tr>
))}
       </tbody>
       </table>
        </div>
           </div>
          </AdminLayout>
       );
      }

export default AdminUsersPage;