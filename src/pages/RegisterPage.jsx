import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function  RegisterPage(){
    const navigate = useNavigate();

    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");

    const handleRegister = ()=>{
        if(password !== confirmPassword){
            alert("Password do not match")
            return;
        }
        axios
        .post("http://localhost:3000/users",{
            name,
            email,
            password,
        })
        .then(()=>{
            alert("Register Successful");
            navigate("/login")
        })
        .catch((error)=>{
            console.log(error);
        })
        
    }

    return(
        <div style={{
            minHeight:'100vh',
            backgroundColor:"#0f172e",
            display:'flex',
            justifyContent:"center",
            alignItems:"center"
        }}>
            <div style={{
                backgroundColor:"white",
                width:"400px",
                padding:"30px",
                borderRadius:"12px"
            }}>
                <h1 style={{
                    textAlign:"center",
                    color:"#111827",
                    fontSize:"36px",
                    marginBottom:"20px"
                }}>
                    Register
                </h1>

                <input type=" text"
                placeholder="Enter your name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                style={{
                    width:"100%",
                    padding:"12px",
                    marginBottom:"15px",
                     border:"1px solid #ccc" ,
                     borderRadius:"8px"   ,
                     boxSizing:"border-box" 
                     }} />


                     <input type="email"
                     placeholder="Enter your email"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"15px",
                        border:"1px solid #ccc" ,
                        borderRadius:"8px"   ,
                         boxSizing:"border-box" 
                        }} />


                        <input type="password" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    style={{              
                        width:"100%",
                        padding:"12px",
                        marginBottom:"15px",
                        border:"1px solid #ccc" ,
                        borderRadius:"8px"   ,
                         boxSizing:"border-box" 
                        }}
                        />

                        <input type="password"
                        placeholder="Confirm your password" 
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"15px",
                        border:"1px solid #ccc" ,
                        borderRadius:"8px"   ,
                         boxSizing:"border-box" 
                        }}/>
                        <button
                        onClick={handleRegister}
                        style={{
                             width: "100%",
                              padding: "12px",
                                backgroundColor: "#16a34a",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer",
                        }}>Register</button>
                        <p 
                        style={{
                            textAlign:"center",
                            marginTop:"20px",
                            cursor:"pointer"
                        }}>
                            Already have an account?{" "}
                            <span 
                            onClick={()=>navigate("/login")}
                            style={{
                                color:"#2563eb",
                                fontWeight:"600",
                                cursor:"pointer"
                            }}>Login</span>
                        </p>
            </div>
        </div>
    )
}
export default RegisterPage;