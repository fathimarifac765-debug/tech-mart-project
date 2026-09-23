import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CategoryPage(){
    const {categoryName} = useParams();
    const navigate = useNavigate();

    const[products,setProducts]=useState([]);

    useEffect(()=>{
        axios
        .get("http://localhost:3000/products")
        .then((response)=>{
            setProducts(response.data)
        })
        .catch((error)=>{
            console.log(error);    
        })
    },[]);

    const filteredProducts = products.filter(
        (product)=>
            product.category.toLowerCase()===
           categoryName.toLowerCase()
    )

    return(
        <div style={{
            padding:"50px",
            textAlign:"center"
        }}>
        
        <h1>{categoryName}</h1>

        <p style={{
            color:"#666",
            marginBottom:"20px"
        }}>
             Explore the best {categoryName} products
        </p>

        
        <p>Total Products:{filteredProducts.length}</p>
        
       <div style={{
        display:"flex",
        gap:"20px",
        flexWrap:"wrap",
        justifyContent:"center",
        marginTop:"40px"
       }}>
      {filteredProducts.map((product)=>(
        <div 
        key={product.id}
        onClick={()=> navigate(`/product/${product.id}`)}
        style={{
           width:"260px",
           minHeight:"380px",
           background:"#fff",
           borderRadius:'16px',
           padding:"20px",
           boxShadow:"0 4px 15px rgba(0,0,0,0.08)",
           textAlign:"center",
           cursor:"pointer"
        }}>
         <img src={product.image}     
         alt={product.name}
         style={{
            width:"100%",
            height:"200px",
            objectFit:"contain"
         }}/> 

         <h3 style={{
            marginTop:"15px",
            marginBottom:"12px"
         }}>{product.name}</h3>  
         <div >
            <span style={{
                fontWeight:"700",
                fontSize:"20px",
                marginTop:"10px"
            }}>
                ₹{product.price}
            </span>
            
            <span style={{
                marginLeft:"8px",
                textDecoration:"line-through",
                color:"gray",
            }}>
            ₹{product.oldPrice}
            </span>
         </div>

         <p style={{
            color:"green",
            fontWeight:"600",
            marginTop:"10px",
            marginBottom:"12px"
         }}>
            {product.discount}
         </p>
        
         <p style={{
            color:"#666",
            fontSize:'14px',
            marginBottom:"15px"
         }}>⭐ {product.rating} ({product.reviews} Reviews)</p>
        </div>
      ))}  
      </div>
      </div>
    );
}
export default CategoryPage;