import { useParams,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useState,useEffect } from "react";
import axios from "axios";

function ProductDetailsPage(){
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state) => state.cart.items
    );

    const [product,setProduct]=useState(null);
    const [quantity,setQuantity] = useState(1)
    
    useEffect(()=>{
        axios
        .get(`http://localhost:3000/products/${id}`)
        .then((response)=>{
            setProduct(response.data);
            console.log(response.data);  
        })
        .catch((error)=>{
            console.log(error);
            
        })
    },[id]);

    const isInCart = cartItems.some(
        (item) => item.id ===product?.id
    )


    if(!product){
        return <h1>Loading...</h1>
    }


    return(
        <div style={{
            minHeight:"100vh",
            backgroundColor:"#0f172a",
            padding:"40px",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <div style={{
                maxWidth:"1000px",
                margin:"auto",
                backgroundColor:"#ffffff",
                borderRadius:"15px",
                padding:"40px",
                display:"flex",
                gap:"50px",
                alignItems:"center"
            }}>
        <div>
            <img 
            src={product.image}
            alt={product.name}
            style={{
                width:"400px",
                height:"400px",
                objectFit:"contain"
            }}/>
        </div>
        <div style={{color:"#111827",flex:1}}>
            <h1 style={{
                fontSize:"48px",
                fontWeight:"800",
                marginBottom:"20pxpx",
                color:"#000000",
                marginTop:"20px",
                lineHeight:"1.2"
            }}>
                {product.name}
            </h1>
            <p style={{
                fontSize:"18px",
                color:"#374151",
                marginBottom:"20px"
            }}>
                ⭐ {product.rating} ({product.reviews} Reviews)       
                </p>
            <div style={{
                display:"flex",
                alignItems:"center",
                gap:"12px",
                marginBottom:"25px"
            }}>
                <span style={{
                    fontSize:"36px",
                    fontWeight:"bold",
                    color:"#111827"
                }}>
                    ₹{product.price.toLocaleString()}
                </span>
                <span style={{
                    textDecoration:"line-through",
                    color:"#6b7280",
                    fontSize:"20px"
                }}>
                    ₹{product.price.toLocaleString()}
                </span>

                <span style={{
                    color:"green",
                    fontWeight:"bold",
                    fontSize:"20px"
                }}>
                    {product.discount}
                </span>
            </div>

            <p style={{
                color:"#4b5563",
                lineHeight:"1.8",
                fontSize:"16px",
                marginBottom:"30px"
            }}>
                  {product.description}
            </p>
            <p style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "20px",
              color: product.stock > 0 ? "green" : "red",
            }}>
              {product.stock > 0
              ? `In Stock (${product.stock} Available)`
             : "Out Of Stock"}
           </p>
           <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "20px",
           }}>
           <button
             onClick={() => {
              if (quantity > 1) {
              setQuantity(quantity - 1);
             }
            }}
           style={{
              padding: "10px 15px",
              cursor: "pointer",
            }}>
            -
         </button>
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
         }}>
           {quantity}
        </span>
        <button
          onClick={() => {
            setQuantity(quantity + 1);
          }}
         style={{
           padding: "10px 15px",
           cursor: "pointer",
         }}>
        +
       </button>
      </div>
            <div style={{
                display:"flex",
                gap:"15px"
            }}>

                <button 
                onClick={()=> navigate("/")}
                style={{
                    padding:"10px 18px",
                    border:"none",
                    borderRadius:"8px",
                    cursor:"pointer"
                }}>
                    ← Back
                </button>
                <button 
                   disabled={product.stock === 0}
                   onClick={() => {
                    if(isInCart){
                        navigate("/cart")
                    }else{
                      dispatch(
                      addToCart({
                       ...product,
                         quantity,
                      })
                  );
                }
                 }}
                  style={{
                  backgroundColor:
                   product.stock === 0
                    ? "#9ca3af"
                    : "#f59e0b",
                    color:"white",
                    border:"none",
                    padding:"14px 28px",
                    borderRadius:"8px",
                    fontSize:"16px",
                    cursor:"pointer"
                }}>
                    {isInCart ? "Go To Cart" : "Add To Cart"}
                </button>

                <button 
                disabled={product.stock === 0}
                 onClick={() => {
                   localStorage.setItem(
                    "buyNowProduct",
                    JSON.stringify({
                    ...product,
                     quantity,
                   })
                );
              navigate("/checkout");
                }}
                style={{
                    backgroundColor:"#f59e0b",
                    color:"white",
                    border:"none",
                    padding:"14px 28px",
                    borderRadius:"8px",
                    fontSize:"16px",
                    cursor:"pointer"
                }}>
                   Buy Now
                </button>
            </div>
        </div>
    </div>
</div>
    );
}
export default ProductDetailsPage;