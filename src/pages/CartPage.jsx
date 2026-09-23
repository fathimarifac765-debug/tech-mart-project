import { useSelector ,useDispatch} from "react-redux";
import { increaseQuantity,decreaseQuantity } from "../redux/cartSlice";
import { removeFromCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  console.log("Cart Items Length:", cartItems.length);
  console.log(cartItems);

  const totalOldPrice = cartItems.reduce(
    (total, item) => total + item.oldPrice * item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalDiscount = totalOldPrice - totalPrice;

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
          fontSize: "60px",
          marginBottom: "40px",
          color: "#8b5cf6",
        }}
      >
        Cart Summary
      </h1>

      {cartItems.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          Your Cart Is Empty
        </h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                maxWidth: "900px",
                width: "100%",
                margin: "0 auto 20px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "contain",
                }}
              />

              <div style={{ textAlign: "center" }}>
                <h2
                  style={{
                    fontSize: "40px",
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: "10px",
                  }}
                >
                  {item.name}
                </h2>

                <h3
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#2563eb",
                    marginBottom: "10px",
                  }}
                >
                  ₹{(item.price * item.quantity).toLocaleString()}
                </h3>

                <p
                  style={{
                    color: "green",
                    fontWeight: "600",
                  }}
                >
                  {item.discount}
                </p>

                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    width: "120px",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <button
                  onClick={()=>
                    dispatch(decreaseQuantity(item.id))
                  }
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "none",
                      backgroundColor: "#f1f5f9",
                      color: "#2563eb",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>

                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#000",
                    }}
                  >
                    {item.quantity}
                  </div>

                  <button
                  onClick={()=>
                    dispatch(increaseQuantity(item.id))
                  }
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "none",
                      backgroundColor: "#f1f5f9",
                      color: "#2563eb",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    marginTop: "20px",
                  }}
                >
                  <button
                  onClick={() => {
                     dispatch(addToWishlist(item));
                     dispatch(removeFromCart(item.id));
                    }}
                    style={{
                      padding: "10px 20px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      backgroundColor: "#2563eb",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Move To Wishlist
                  </button>

                  <button
                  onClick={()=>
                    dispatch(removeFromCart(item.id))
                  }
                    style={{
                      padding: "10px 20px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                width: "400px",
                backgroundColor: "white",
                padding: "25px",
                borderRadius: "10px",
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Price Details
              </h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                  color: "black",
                }}
              >
                <span>Price ({cartItems.length} Items)</span>
                <span>₹{totalOldPrice.toLocaleString()}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                  color: "black",
                }}
              >
                <span>Discount</span>
                <span style={{ color: "green" }}>
                  -₹{totalDiscount.toLocaleString()}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                  color: "black",
                }}
              >
                <span>Delivery Charges</span>
                <span style={{ color: "green" }}>Free</span>
              </div>

              <hr />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                <span>Total Amount</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <button
              onClick={()=>{
                localStorage.setItem("checkoutType","cart")
                navigate("/checkout")}}
                  style={{
                     width: "100%",
                     marginTop: "20px",
                     padding: "14px",
                     backgroundColor: "#8b5cf6",
                     color: "white",
                     border: "none",
                     borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                     cursor: "pointer",
                    }}
                     >
                    Proceed To Checkout
                </button>

        
        </div>
      </div>
    </>
    )}
</div>
 );
}

            

export default CartPage;