import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function LoginPage(){
    const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const handleLogin = () => {
  if(!email || !password){
    setError("Please fill all fields");
    return;
  }
  axios
    .get("http://localhost:3000/users")
    .then((response)=>{
        const user = response.data.find(
        (u) => 
            u.email ===email &&
            u.password ===password
        );
        if(user){
            localStorage.setItem(
                "user",
                JSON.stringify({
                    email: user.email,
                    isLoggedIn : true,
                })
            );
            navigate("/");
        }else{
            setError("Invalid Email or Password")
        }    
    })
    .catch((error)=>{
        console.log(error);
        
    })
};
    return(
        <div style={{
            minHeight:"100vh",
            backgroundColor:"#0f172e",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <div style={{
                backgroundColor:"white",
                padding:"30px",
                borderRadius:"12px",
                width:"350px"
            }}>
                <h1 style={{
                    fontSize:"36px",
                    color:"#111827",
                    textAlign:"center",
                    fontWeight:"700",
                    marginBottom:"20px"
                }}>Login</h1>

                <input type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                style={{
                    width:"100%",
                    padding:"12px",
                    marginTop:"20px",
                    marginBottom:"15px",
                    border:"1px solid #ccc",
                    borderRadius:"8px",
                    boxSizing:"border-box"
                }}/>
                <input type="password"
                placeholder="Enter your password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                style={{
                    width:"100%",
                    padding:"12px",
                    marginTop:"20px",
                    marginBottom:"15px",
                    border:"1px solid #ccc",
                    borderRadius:"8px",
                    boxSizing:"border-box"
                }}/>
               {error && (
                <p
                 style={{
                 color: "red",
                 textAlign: "center",
                 marginBottom: "10px",
               }}>
               {error}
              </p>
             )}

        <button
          onClick={handleLogin}
           style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}>
              Login
        </button>

        <p style={{
            textAlign:"center",
            marginTop:"20px",
            color:"#374151"
        }}>
            Don't have an account?{" "}
            <span 
            onClick={()=>navigate("/register")}
            style={{
                color:"#2563eb",
                fontWeight:"600",
                cursor:"pointer"
            }}>
                Register
            </span>
        </p>
               
            </div>
        </div>
    )
}
export default LoginPage;