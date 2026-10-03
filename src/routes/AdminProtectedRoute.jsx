import { Navigate } from "react-router-dom";

function AdminProtectedRoute({children}){
    const adminLoggedIn =
       sessionStorage.getItem("adminLoggedIn");

       if(!adminLoggedIn){
        return <Navigate to="/admin/login"/>    
      }
      return children;
}
export default AdminProtectedRoute;