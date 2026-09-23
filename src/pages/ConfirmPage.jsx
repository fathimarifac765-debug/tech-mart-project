import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function ConfirmPage(){
    const navigate = useNavigate();

    const checkoutData =
           JSON.parse(localStorage.getItem("checkoutData")) || {};

      const cartItems = useSelector(
        (state)=> state.cart.items
      );
      const checkoutType =
            localStorage.getItem("checkoutType");

      const buyNowProduct =
        JSON.parse(localStorage.getItem("buyNowProduct"));

     const productsToShow =
          checkoutType === "buyNow"
        ? [{ ...buyNowProduct, quantity: 1 }]
           : cartItems;
      
     const totalAmount = productsToShow.reduce(
    (total,item)=> total + item.price * item.quantity,
     0
    );   
   return(
    <div style={{
        minHeight:"100vh",
        backgroundColor:"#0f172a",
        padding:"40px"
    }}>
        <h1 style={{
            textAlign:"center",
            color:"#8b5cf6",
            marginBottom:"30px"
        }}>
            Confirm Details
        </h1>
        <div style={{
            maxWidth:"800px",
            margin:"0 auto",
            backgroundColor:"white",
            padding:"25px",
            borderRadius:"12px",
            color:"black",
            textAlign:"left"
        }}>
            <h2 style={{color:"black",fontWeight:"600"}}>Delivering To</h2>
            <div style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                marginBottom:"10px"
            }}>
                <strong style={{fontSize:"20px"}}>
                  {checkoutData.fullName}
                </strong>
                <button
                onClick={()=> navigate("/checkout")}
                style={{
                    background:"none",
                    border:"none",
                    color:"#2563eb",
                    fontWeight:"600",
                    cursor:"pointer",
                    fontSize:"16px"
                }}>
                    Change
                </button>
            </div>
            <p>
                {checkoutData.address} <br/>
                {checkoutData.city}-{checkoutData.pincode}
            </p>

           <p>📞 {checkoutData.phone}</p>
        </div>
        <div style={{
            backgroundColor:"white",
            padding:"25px",
            borderRadius:"12px",
            color:"black",
            fontWeight:"bold"
        }}>
            <h2 style={{ marginBottom:"15px",color:"black",fontWeight:"600"}}>
                Order Summary
            </h2>
            {
                productsToShow.map((item)=>(
                    <div key={item.id}>
                       <p>
                        <strong>{item.name}</strong>
                       </p>

                       <p>
                        Price: ₹{item.price.toLocaleString()}
                       </p>

                       <p>
                        Quantity: {item.quantity}
                       </p>

                      <hr />
                    </div>
                ))
            }
            <h3 style={{
                color:"black",
                marginTop:"20px",
                marginBottom:"20px"
            }}>
                Total Amount:  ₹{totalAmount.toLocaleString()}
            </h3>
            <button 
            onClick={()=> navigate("/payment")}
            style={{
                width: "100%",
              marginTop: "20px",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#8b5cf6",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}>
                Continue To Payment
            </button>
        </div>
    </div>
   )
}
export default ConfirmPage