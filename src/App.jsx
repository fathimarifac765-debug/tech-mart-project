import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmPage from "./pages/ConfirmPage";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderPage from "./pages/OrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import CategoryPage from "./pages/CategoryPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminOrderDetailsPage from "./pages/AdminOrderDetailsPage";
import AdminUsersPage from "./pages/AdminUsersPage";

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/product/:id" element={<ProductDetailsPage/>}/>
      <Route path="/category/:categoryName" element={<CategoryPage/>}/>
      <Route path="/cart" element={
        <ProtectedRoute>
        <CartPage/>
        </ProtectedRoute>}/>
      <Route path="/wishlist" element={<WishlistPage/>}/>
      <Route path="/checkout" element={
         <ProtectedRoute>
         <CheckoutPage />
         </ProtectedRoute>
      }/>
      <Route path="/confirm" element={<ConfirmPage/>}/>
      <Route path="/payment" element={<PaymentPage/>}/>
      <Route path="/order-success" element={<OrderSuccessPage/>}/>
      <Route path="/orders" element={
        <ProtectedRoute>
         <OrderPage />
       </ProtectedRoute>}/>
      <Route path="/order-details" element={<OrderDetailsPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/admin/login" element={<AdminLoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/admin/dashboard" 
      element={
      <AdminProtectedRoute>
        <AdminDashboardPage/>
      </AdminProtectedRoute>
        }/>
        <Route path="/admin/products" 
        element={
         <AdminProtectedRoute>
          <AdminProductsPage/>
         </AdminProtectedRoute>  
        }/>
        <Route path="/admin/orders" 
        element={
         <AdminProtectedRoute>
          <AdminOrdersPage/>
         </AdminProtectedRoute>  
        }/>
        <Route
         path="/admin/order-details/:id"
          element={
         <AdminProtectedRoute>
         <AdminOrderDetailsPage />
        </AdminProtectedRoute>
        }/>
        <Route
          path="/admin/users"
          element={
          <AdminProtectedRoute>
          <AdminUsersPage />
          </AdminProtectedRoute>
          }/>
      

    </Routes>
    </BrowserRouter>
  )
};
export default App;