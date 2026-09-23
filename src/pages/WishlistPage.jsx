import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { removeFromWishlist } from "../redux/wishlistSlice";

function WishlistPage() {
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const dispatch = useDispatch();

  if (wishlistItems.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#7b2ff7",
        }}
      >
        ❤️ Your Wishlist Is Empty
      </div>
    );
  }

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
        My Wishlist
      </h1>

      {wishlistItems.map((item) => (
        <div
          key={item.id}
          style={{
            maxWidth: "900px",
            margin: "0 auto 20px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />

          <div style={{ flex: 1 }}>
            <h2
              style={{
                margin: "0 0 10px",
                color: "#111827",
              }}
            >
              {item.name}
            </h2>

            <h3
              style={{
                margin: "0",
                color: "#111827",
              }}
            >
              ₹{item.price.toLocaleString()}
            </h3>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <button
              onClick={() => {
                dispatch(addToCart(item));
                dispatch(removeFromWishlist(item.id));
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#7b2ff7",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Move To Cart
            </button>

            <button
              onClick={() =>
                dispatch(removeFromWishlist(item.id))
              }
              style={{
                padding: "10px 20px",
                backgroundColor: "#ffffff",
                color: "#ef4444",
                border: "1px solid #ef4444",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WishlistPage;