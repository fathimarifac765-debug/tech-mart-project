import { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";

function ProductCard({searchTerm,selectedCategory,sortOrder}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const wishlistItems = useSelector(
    (state)=>state.wishlist.items
  );
  console.log(wishlistItems);

  const [products, setProducts] = useState([]);
  const [loading,setLoading]=useState(true);



  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false)
        
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  }, []);

  const filteredProducts = products.filter(
  (product) => {
    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(
          (searchTerm || "").toLowerCase()
        );   

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  }
);
let sortedProducts = [...filteredProducts];
           if (sortOrder === "lowToHigh") {  
              sortedProducts.sort((a, b) => a.price - b.price);
         }  
          if (sortOrder === "highToLow") {
             sortedProducts.sort((a, b) => b.price - a.price);
         }  

         
         
    if(sortedProducts.length === 0){
      return(
        <div 
        style={{
          textAlign:"center",
          padding:"80px"
        }}>
          <h2>No Products Found</h2>
          <p>Try another search or category</p>
        </div>
      )
    }     

if(loading){
  return(
    <h2 style={{textAlign:"center"}}>
      Loading Products...
    </h2>
  )
}

  return (
    <div
      style={{
        padding: "40px 60px",
        background: "#f8f9fc",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "38px",
          fontWeight: "700",
        }}
      >
        Best Deals For You
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {sortedProducts.map((product) => {
          const isInCart = cartItems.some(
            (item) => item.id === product.id
          );

          const isInWishlist = wishlistItems.some(
            (item)=> item.id === product.id
          )
          return (
            <div
              key={product.id}
              onClick={() => {
                navigate(`/product/${product.id}`);
              }}
              style={{
                width: "230px",
                background: "#fff",
                borderRadius: "16px",
                padding: "18px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                position: "relative",
                textAlign: "center",
              }}
            >
              <span
                 onClick={(e)=>{
                  e.stopPropagation();
                  dispatch(addToWishlist(product))
                 }}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  fontSize: "20px",
                  cursor: "pointer",
                  color:isInWishlist ? "red" :"#9ca3af"
                }}
              >
                ♥ 
              </span>

              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "170px",
                  objectFit: "contain",
                }}
              />

              <h3
                style={{
                  fontSize: "18px",
                  marginBottom: "12px",
                  minHeight: "45px",
                }}
              >
                {product.name}
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "6px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "22px",
                  }}
                >
                  ₹{product.price.toLocaleString()}
                </span>

                <span
                  style={{
                    textDecoration: "line-through",
                    color: "gray",
                    fontSize: "14px",
                  }}
                >
                  ₹{product.oldPrice.toLocaleString()}
                </span>
              </div>

              <p
                style={{
                  color: "green",
                  fontWeight: "600",
                  marginTop: "8px",
                }}
              >
                {product.discount}
              </p>

              <p
                style={{
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                ⭐ {product.rating} ({product.reviews} Reviews)
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  if (isInCart) {
                    navigate("/cart");
                  } else {
                    dispatch(addToCart(product));
                  }
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "10px",
                  background: "#2874f0",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {isInCart ? "Go To Cart" : "Add To Cart"}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  localStorage.setItem(
                    "buyNowProduct",
                    JSON.stringify(product)
                  );
                  localStorage.setItem("checkoutType","buyNow")
                  navigate("/checkout")
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "10px",
                  background:
                    "linear-gradient(90deg,#7b2ff7,#4d45e8)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductCard;