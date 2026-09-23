import { useNavigate } from "react-router-dom";

import mobile from "../assets/mobile.png";
import laptop from "../assets/laptop.png";
import watch from "../assets/watch.png";
import headphone from "../assets/headphone.png";
import accessories from "../assets/accessories.png";
import tablets from "../assets/tablets.png";
import speakers from "../assets/speakers.png";
import more from "../assets/more.png";


function CategoryCard({setSelectedCategory}){
    const categories=[
        {image:mobile,name:"Mobiles"},
        {image:laptop,name:"Laptops"},
        {image:watch,name:"Smart Watches"},
        {image:headphone,name:"Headphones"},
        {image:accessories,name:"Accessories"},
        {image:tablets,name:"Tablets"},
        {image:speakers,name:"Speakers"},
        {image:more,name:"More"},
        
    ];

    const navigate = useNavigate()

    return(
        <section
        style={{
            padding:"20px",
            backgroundColor:"#f5f7fb"
        }}>
      <div
      style={{
           display:"flex",
           justifyContent:"space-between",
           gap:"15px",
          flexWrap:"nowrap",
      }}>

        {categories.map((item,index)=>(
            <div
            key={index}
            onClick={() =>{
             setSelectedCategory(item.name);
             navigate(`/category/${item.name}`)
              }}
            style={{
                width:"150px",
                height:"120px",
                backgroundColor:"white",
                borderRadius:"12px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                boxShadow:"0 2px 10px rgba(0,0,0,0.08)",
                cursor:"pointer"
            }}>
            <img
              src={item.image}
              alt={item.name}
              style={{
                width:"80px",
                height:"80px",
                objectFit:"contain",
              }}
            />
            <p
            style={{
                marginTop:"8px",
                fontSize:"14px",
                fontWeight:"600",
                color:"#333",
            }}
            >
            {item.name}
            </p>
            </div>
        ))}
      </div>
      </section>
    );
}
export default CategoryCard;