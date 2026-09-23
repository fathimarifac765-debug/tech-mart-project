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
      <Route path="/register" element={<RegisterPage/>}/>
      

    </Routes>
    </BrowserRouter>
  )
};
export default App;