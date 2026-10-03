import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import axios from "axios";

function PaymentPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showAmountDetails, setShowAmountDetails] = useState(false);
     const [openSection, setOpenSection] = useState("cod");
     const[upiId,setUpiId]=useState("");
     const[upiError,setUpiError]=useState("")
     const [cardNumber, setCardNumber] = useState("");
     const [expiry, setExpiry] = useState("");
     const [cvv, setCvv] = useState("");
     const [cardError, setCardError] = useState("");

     const cartItems = useSelector(
        (state) => state.cart.items
     );

     const buyNowProduct =
        JSON.parse(localStorage.getItem("buyNowProduct"));

     const productsToShow = buyNowProduct
       ? [{ ...buyNowProduct, quantity: 1 }]
       : cartItems;

     const totalAmount = productsToShow.reduce(
        (total,item) => total + item.price * item.quantity,
     0);
     const discount =  Math.round(totalAmount * 0.1);
     const mrp = totalAmount +discount;

     const checkoutData =
       JSON.parse(localStorage.getItem("checkoutData")) || {};

       const deliveryDate = new Date();
       deliveryDate.setDate(deliveryDate.getDate()+5)

       const saveOrder =  async (paymentMethod)=>{
        const orderData ={
            orderId :"TM" + Date.now(),
            customerName:checkoutData.fullName,
            address:checkoutData.address,
            phone:checkoutData.phone,
            items:cartItems,
            totalAmount,
            paymentMethod,
            status:"Order Confirmed",
            orderDate:new Date().toLocaleDateString(),
            estimatedDelivery:deliveryDate.toLocaleDateString(),
        }
        await axios.post(
            "http://localhost:3000/orders",
            orderData
        );
       const existingOrders =
          JSON.parse(localStorage.getItem("orders")) || [];

         existingOrders.push(orderData);

        localStorage.setItem(
           "orders",
        JSON.stringify(existingOrders)
       );
       localStorage.setItem(
        "orderData",
       JSON.stringify(orderData)
       );
       };

     const handleUpiPayment = ()=>{
        if(!upiId.trim()){
            setUpiError("Please Enter UPI ID");
            return;
        }
        setUpiError("");
        saveOrder("UPI")
        localStorage.removeItem("buyNowProduct");
        dispatch(clearCart());
        navigate("/order-success")
     }

     const handleCardPayment =()=>{
        if(!cardNumber || !expiry || !cvv){
            setCardError("Please fill all card details");
            return;
        }
        setCardError("");
        saveOrder("Card");
        localStorage.removeItem("buyNowProduct");
        dispatch(clearCart());
        navigate("/order-success");
     }
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
                Payment
            </h1>
       <div style={{
        maxWidth:"800px",
        margin:"0 auto"
       }}>
        <div
        onClick={() => setShowAmountDetails(!showAmountDetails)}
        style={{
            backgroundColor:"white",
            padding:"20px",
            borderRadius:"10px",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            cursor:"pointer"
        }}>
            <span style={{
                fontSize:"18px",
                fontWeight:"600",
                color:"black"
            }}>
                Total Amount {showAmountDetails ? "▲" : "▼"}
            </span>

            <span style={{fontSize:"18px",fontWeight:"700",color:"black"}}>
                ₹{totalAmount.toLocaleString()}
            </span>
        </div>

        {showAmountDetails && (
        <div style={{
            backgroundColor:"white",
            padding:"20px",
            borderRadius:"10px",
            marginTop:"5px",
            marginBottom:"15px"
            }}>
                <div style={{
                 display:"flex",
                 justifyContent:"space-between",
                 marginBottom:"10px",
                 color:"black"
                }} >
                    <span>MRP</span>
                    <span>₹{mrp.toLocaleString()}</span>
                </div>
                <div style={{
                    display:"flex",
                    justifyContent:"space-between",
                    marginBottom:"10px",
                    color:"black"
                }}>
                    <span>Discount</span>
                    <span style={{color:"green"}}>
                        ₹-{discount.toLocaleString()}
                    </span>
                </div>
                <div style={{
                    display:"flex",
                    justifyContent:"space-between",
                    marginBottom:"10px",
                    color:"black"
                }}>
                    <span>Delivery Fee</span>
                    <span style={{color:"green"}}>FREE</span>
                </div>
                <hr />
                <div style={{
                    display:"flex",
                    justifyContent:"space-between",
                    marginBottom:"10px",
                    fontWeight:"bold",
                    fontSize:"18px",
                    color:"black"
                }}>
                    <span>Total Amount</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                </div>
            </div>
            )}
       </div>
       <div
  style={{
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "15px",
  }}
>
  <div
  onClick={()=>setOpenSection("cod")}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor:"pointer"
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <input type="radio" name="payment" />

      <span
        style={{
          fontSize: "18px",
          fontWeight: "500",
          color: "black",
        }}
      >
        Cash On Delivery
      </span>
    </div>

    <span
      style={{
        fontSize: "20px",
        fontWeight: "bold",
        color: "black",
      }}
    >
      ▼
    </span>
  </div>
{openSection === "cod" && (
    <>
  <div
    style={{
      marginTop: "15px",
      padding: "15px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      color: "black",
      fontSize: "14px",
      lineHeight: "22px",
    }}
  >
    Pay when your order arrives at your doorstep. Cash on Delivery is
    available for eligible orders. For a faster and contactless experience,
    online payment options are recommended.
  </div>
   <button 
   onClick={async()=>{
      await saveOrder("Cash On Delivery");
    localStorage.removeItem("buyNowProduct");
    dispatch(clearCart());
    navigate("/order-success")
   }}
   style={{
                
                    marginTop:"20px",
                    padding:"10px 25px",
                    backgroundColor:"#7b2ff7",
                    color:"white",
                    border:"none",
                    borderRadius:"6px",
                    fontSize:"16px",
                    fontWeight:"bold",
                    cursor:"pointer",
                    display:"block",
                    marginLeft:"auto",
                    marginRight:"auto"
                }}>
                    Pay ₹{totalAmount.toLocaleString()}
                </button>
                </>
            )}
       </div>

        <div style={{
            backgroundColor:"white",
            padding:"20px",
            borderRadius:"10px",
            marginTop:"15px",
           
        }}>
            <div 
            onClick={()=>setOpenSection("upi")}
            style={{
                 display: "flex",
                 justifyContent: "space-between",
                 alignItems: "center",
                 cursor:"pointer"

            }}>
                <span style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "black",
                }}>UPI</span>

                <span style={{
                    fontSize:"20px",
                    fontWeight: "bold",
                     color: "black",
                }}>▼</span>
            </div>

            {openSection === "upi" && (
             <div style={{
                marginTop:"15px",
                color:"black",
                display:"flex",
                flexDirection:"column",
                gap:"12px"
             }}>
                <label>
                    <input type="radio" name="payment" /> Google pay
                </label>

                <label >
                    <input type="radio"  name="payment"/>PhonePe
                </label>
                <label>
                    <input type="radio" name="payment" /> Add New UPI ID
                </label>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    marginTop:"15px",
                    gap:"15px"
                }}>
                <input type="text" 
                placeholder="Enter UPI ID"
                value={upiId}
                onChange={(e)=>setUpiId(e.target.value)}
                style={{
                    width:"300px",
                    padding:"12px",
                    border:"1px solid #ccc",
                    borderRadius:"6px",
                    fontSize:"14px",
                    
                }}/>
               {upiError && (
                <p style={{
                    color:"red",
                    fontSize:"14px",
                    margin:"0"
                }}>
                    {upiError}
                </p>
               )}
                 <button 
                  onClick={handleUpiPayment}
                 style={{
                    padding:"10px 25px",
                    backgroundColor:"#7b2ff7",
                    color:"white",
                    border:"none",
                    borderRadius:"6px",
                    fontSize:"16px",
                    fontWeight:"bold",
                    cursor:"pointer",
                    
                }}>
                    Pay ₹{totalAmount.toLocaleString()}
                </button>
                </div>
             </div>
            )}
         </div>   
           

        <div style={{
        backgroundColor:"white",
        padding:"20px",
        borderRadius:"10px",
        marginTop:"15px",
       
        }}>
            <div 
            onClick={()=> setOpenSection("card")}
            style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                cursor:"pointer"
            }}>
                <span  style={{
                fontSize:"18px",
                fontWeight:"500",
                color:"black"
            }}>Credit/Debit/ATM Card</span>
          
            <span style={{fontSize:"20px",fontWeight:"bold",color:"black"}}>▼ </span>
            </div>

            {openSection === "card" && (
            <div style={{marginTop:"20px"}}>
                <input type="text"
                placeholder="Card Number" 
                value={cardNumber}
                onChange={(e)=>setCardNumber(e.target.value)}
                style={{
                    width:"500px",
                    padding:"12px",
                    border:"1px solid #ccc",
                    borderRadius:"6px",
                    marginBottom:"15px",
                    display:"block",
                    marginLeft:"auto",
                    marginRight:"auto"
                }}/>
                <div style={{display:"flex",gap:"15px"}}>
                    <input type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e)=>setExpiry(e.target.value)}
                    style={{
                        flex:1,
                        padding:"12px",
                        border:"1px solid #ccc",
                        borderRadius:"6px",
                    }} />
                     <input type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e)=>setCvv(e.target.value)}
                    style={{
                        flex:1,
                        padding:"12px",
                        border:"1px solid #ccc",
                        borderRadius:"6px",
                    }} />
                  </div>
                  {cardError && (
                    <p style={{color:"red",marginTop:"10px"}}>
                        {cardError}
                    </p>
                )}
                <button 
                onClick={handleCardPayment}
                style={{
                
                    marginTop:"20px",
                    padding:"10px 25px",
                    backgroundColor:"#7b2ff7",
                    color:"white",
                    border:"none",
                    borderRadius:"6px",
                    fontSize:"16px",
                    fontWeight:"bold",
                    cursor:"pointer",
                    display:"block",
                    marginLeft:"auto",
                    marginRight:"auto"
                }}>
                    Pay ₹{totalAmount.toLocaleString()}
                </button>
            </div>
            )}
        </div>
        </div>
    )
}
export default PaymentPage