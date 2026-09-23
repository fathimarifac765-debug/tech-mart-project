import { useState ,useRef} from "react";
import Navbar from "../components/Navbar";
import CategoryMenu from "../components/CategoryMenu";
import HeroBanner from "../components/HeroBanner";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import FeaturesSection from "../components/FeaturesSection"
import Footer from "../components/Footer";


function HomePage(){
    

    const [searchTerm,setSearchTerm]=useState("");
    const[selectedCategory,setSelectedCategory]=useState("All");
    const[sortOrder,setSortOrder]=useState("");
    const productsRef = useRef(null);
    return(
        <div style={{
            width:"100%",
            margin:"0",
            padding:"0"
        }}>
    
        <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        productsRef={productsRef}/>
        <CategoryMenu
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}/>
        <HeroBanner/>
        <CategoryCard
        setSelectedCategory={setSelectedCategory}/>
        <div ref={productsRef}>
        <ProductCard
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        sortOrder={sortOrder}/>
        </div>
        <FeaturesSection/>
        <Footer/>
</div>
       
        
    );
}
export default HomePage;