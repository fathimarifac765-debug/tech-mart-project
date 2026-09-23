import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom"

function CheckoutPage(){
    const navigate = useNavigate();

    const[fullName,setFullName]=useState("");
    const[address,setAddress]=useState("");
    const[city,setCity]=useState("");
    const[pincode,setPincode]=useState("");
    const[phone,setPhone]=useState("");

    const[error,setError]=useState("");

    useEffect(()=>{
        const savedData = JSON.parse(
            localStorage.getItem("checkoutData")
        );
        
        if(savedData){
            setFullName(savedData.fullName || "");
            setAddress(savedData.address || "");
            setCity(savedData.city || "");
            setPincode(savedData.pincode || "");
            setPhone(savedData.phone || "")
        }
    },[])

    const handleContinue = ()=> {
        if(
            !fullName ||
            !address ||
            !city ||
            !pincode ||
            !phone 
        ){
            setError("Please fill all required fields");
            return;
        }

        localStorage.setItem(
            "checkoutData",
            JSON.stringify({
                fullName,
                address,
                city,
                pincode,
                phone,
            })
        )
        setError("");
        navigate("/confirm")
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
                fontSize:"50px"
            }}>
                checkout
          </h1>
          <div style={{
            maxWidth:"800px",
            margin:"30px auto",
            backgroundColor:"white",
            padding:"30px",
            borderRadius:"12px"
          }}>
            <h2 style={{
                marginBottom:"20px",
                color:"#111827"
            }}>
                Delivery Address
            </h2>
          <div style={{marginBottom:"15px"}}>
            <label style={{
                display:"block",
                marginBottom:"5px",
                fontWeight:"600",
                color:"black",
                textAlign:"left"
            }}>Full Name</label>
            <input type="text"
            placeholder="Enter your full name" 
            value={fullName}
            onChange={(e)=> setFullName(e.target.value)}
            style={{
                width:"100%",
                padding:"12px",
                border:"1px solid #d1d5db",
                borderRadius:"8px",
                fontSize:"16px",
                boxSizing:"border-box"
            }}/> 
          </div>
          <div style={{ marginBottom:"15px" }}>
            <label style={{
                display:"block",
                marginBottom:"5px",
                fontWeight:"600",
                color:"black",
                textAlign:"left"
            }}>
                Address
            </label>
            <textarea 
            placeholder="Flat/House/Building Name"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            rows="3"
            style={{
                width:"100%",
                padding:"12px",
                 border:"1px solid #d1d5db",
                borderRadius:"8px",
                fontSize:"16px",
                boxSizing:"border-box",
                resize:"none"
            }}/>
          </div>
          <div style={{marginBottom:"15px"}}>
            <label style={{
                display:"block",
                marginBottom:"5px",
                fontWeight:"600",
                color:"black",
                textAlign:"left"
            }}>
                City Name
            </label>
            <input type="text"
            placeholder="Area/Sector/Locality"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            style={{
                width:"100%",
                padding:"12px",
                border:"1px solid #d1d5db",
                borderRadius:"8px",
                fontSize:"16px",
                boxSizing:"border-box"
            }} />
          </div>
          <div style={{marginBottom:"15px"}}>
            <label style={{
                display:"block",
                marginBottom:"5px",
                fontWeight:"600",
                color:"black",
                textAlign:"left"
            }}>Pincode</label>
            <input type="text"
            placeholder="Enter your pincode" 
            value={pincode}
            onChange={(e)=>setPincode(e.target.value)}
            style={{
                width:"100%",
                padding:"12px",
                border:"1px solid #d1d5db",
                borderRadius:"8px",
                fontSize:"16px",
                boxSizing:"border-box"
            }}/>
          </div>
           <div style={{marginBottom:"15px"}}>
            <label style={{
                display:"block",
                marginBottom:"5px",
                fontWeight:"600",
                color:"black",
                textAlign:"left "
            }}>
                Phone Number
            </label>
            <input type="text"
            placeholder="10-digit number" 
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            style={{
                 width:"100%",
                padding:"12px",
                border:"1px solid #d1d5db",
                borderRadius:"8px",
                fontSize:"16px",
                boxSizing:"border-box"
            }}/>
           </div>
           <div style={{marginBottom:"15px"}}>
            <label style={{
                  display:"block",
                marginBottom:"5px",
                fontWeight:"600",
                color:"black",
                textAlign:"left"
            }}>
                Alternative Number
            </label>
            <input type="text" 
            placeholder="optional"
            style={{
                 width:"100%",
                padding:"12px",
                border:"1px solid #d1d5db",
                borderRadius:"8px",
                fontSize:"16px",
                boxSizing:"border-box"
            }}/>
           </div>
           {error && (
            <p style={{
                color:"red",
                textAlign:"center",
                marginBottom:"15px",
                fontWeight:"600"
            }}>
                {error}
            </p>
           )}
           <div style={{marginTop:"25px"}}>
            <button 
            onClick={handleContinue}
            style={{
                width:"100%",
                padding:"14px",
                border:"1px solid #d1d5db",
                borderRadius:"8px",
                fontSize:"16px",
                backgroundColor:"#8b5cf6",
                color:"white",
                border:"none",
                fontWeight:"600",
                cursor:"pointer"
            }}>
                Continue
            </button>
           </div>
           

          </div>      
        </div>
    )
}
export default CheckoutPage