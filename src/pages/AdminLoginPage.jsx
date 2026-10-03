import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AdminLoginPage(){
    const navigate = useNavigate();

    const [error,setError] = useState("")
    

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    const handleLogin =  async ()=>{
        console.log(email);
        console.log(password);

        const response = await axios.get("http://localhost:3000/admins");
        console.log(response.data);

        const admin = response.data[0];
        
        if(email === admin.email && password === admin.password){
               sessionStorage.setItem("adminLoggedIn","true")

            navigate("/admin/dashboard");   
        }else{
            setError("Invalid Email or Password");
            
        }
    }

    return(
        <div style={{
            minHeight:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"#0f172a"
        }}>

            <div style={{
                display:"flex",
                flexDirection:"column",
                gap:"15px",
                backgroundColor:"#ffffff",
                padding:"40px",
                borderRadius:"15px",
                boxShadow:"0 4px 15px rgba(0,0,0,0.1)",
                width:"400px"

            }}>
            <h1>Admin Login</h1>

          <input type="email"
          placeholder="Enter Admin Email"
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            padding:"12px",
            fontSize:"16px",
            border:"1px solid #d1d5db",
            borderRadius:"8px",
            outline:"none"
          }}/>

          <input type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)} 
          style={{
            padding:"12px",
            fontSize:"16px",
            border:"1px solid #d1d5db",
            borderRadius:"8px",
            outline:"none"
          }}/>

          {error && (
             <p style={{ color: "red" }}>
             {error}
              </p>)}

          <button 
          onClick={handleLogin}
          style={{
            background:"linear-gradient(120deg,#7b2ff7,#4d45e8)",
            color:"white",
            border:"none",
            padding:"12px",
            borderRadius:"8px",
            fontSize:"16px",
            fontWeight:"600",
            cursor:"pointer"
          }}>Login</button>
        </div>
        </div>
    );
}
export default AdminLoginPage