import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts as setProductsRedux,addProduct,deleteProduct,updateProduct } from "../redux/productsSlice";
import AdminLayout from "../layouts /AdminLayout";


function AdminProductsPage(){

     const dispatch = useDispatch();
     const reduxProducts = useSelector(
        (state) => state.products.products
     );

     const [showForm,setShowForm] = useState(false);

     const [productName,setProductName] = useState("");
     const [category,setCategory] = useState("");
     const [price,setPrice] = useState("");
     const [oldPrice,setOldPrice] = useState("");
     const [brand,setBrand] = useState("");
     const [image,setImage] = useState("");
     const [rating,setRating] = useState("");
     const [reviews,setReviews] = useState("");
     const [stock,setStock] = useState("");
     const [description,setDescription] = useState("");

     const [sortOption, setSortOption] = useState("");
     const [searchTerm, setSearchTerm] = useState("");

     const [editId,setEditId] = useState(null);

     const [currentPage, setCurrentPage] = useState(1);
     const productsPerPage = 5;

     const lastProductIndex =
     currentPage * productsPerPage;

     const firstProductIndex =
     lastProductIndex - productsPerPage;

     const sortedProducts = [...reduxProducts];

     const filteredProducts = sortedProducts.filter(
  (product) =>
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
);

if (sortOption === "lowToHigh") {
  filteredProducts.sort((a, b) => a.price - b.price);
}

if (sortOption === "highToLow") {
  filteredProducts.sort((a, b) => b.price - a.price);
}

if (sortOption === "aToZ") {
  filteredProducts.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

if (sortOption === "zToA") {
  filteredProducts.sort((a, b) =>
    b.name.localeCompare(a.name)
  );
}

  const currentProducts =
filteredProducts.slice(
  firstProductIndex,
  lastProductIndex
);

      const totalPages = Math.ceil(
       filteredProducts.length / productsPerPage
      );

     useEffect(()=>{
        fetch("http://localhost:3000/products")
        .then((res)=> res.json())
        .then((data)=>dispatch(setProductsRedux(data)))
        .catch((error)=>console.log(error));
     },[dispatch])

     const handleAddProduct = async () => {
        const newProduct = {
            id: Date.now(),
            name: productName,
            category:category,
            price: Number(price),
            oldPrice:Number(oldPrice),
            brand:brand,
            image:image,
            rating:Number(rating),
            reviews:reviews,
            stock:Number(stock),
            description:description,

            discount:
            Math.round(
                ((oldPrice - price) / oldPrice) * 100
            )+"% OFF"
        };
        if(editId){
            try{
                const response = await fetch (
                    `http://localhost:3000/products/${editId}`,
                    {
                        method: "PUT",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: editId,
                            ...newProduct,
                        }),
                    }
                );
                const updatedProduct = await response.json();

                dispatch(updateProduct(updatedProduct));

                setEditId(null);

            setProductName("");
             setCategory("");
             setPrice("");
             setOldPrice("");
             setBrand("");
             setImage("");
             setRating("");
             setReviews("");
             setStock("");
             setDescription("");

             setShowForm(false);

             } catch(error){
               console.log(error);    
             }
            return;   
        }
        try{
            const response = await fetch (
                "http://localhost:3000/products",
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newProduct),
                }
            );

            const data = await response.json();

           dispatch(addProduct(data));

             setProductName("");
             setCategory("");
             setPrice("");
             setOldPrice("");
             setBrand("");
             setImage("");
             setRating("");
             setReviews("");
             setStock("");
             setDescription("");

             setShowForm(false)
        } catch(error){
            console.log(error);
            
        }

     };

    const handleDelete = async (id)=> {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if(!confirmDelete){
            return;
        }
        try{
            await fetch(`http://localhost:3000/products/${id}`,{
                method: "DELETE",
            });
           dispatch(deleteProduct(id));
        }catch (error){
            console.log(error);
            
        }
    }

    const handleEdit = (product) => {
        setShowForm(true);

        setEditId(product.id);

        setProductName(product.name);
        setCategory(product.category);
        setPrice(product.price);
        setOldPrice(product.oldPrice);
        setBrand(product.brand);
        setImage(product.image);
        setRating(product.rating);
        setReviews(product.reviews);
        setStock(product.stock);
        setDescription(product.description)
    }

    return(
        <AdminLayout>
        <div 
        
        style={{
            padding:"40px",
            backgroundColor:"#f8fafc",
            minHeight:"100vh"
        }}>
            <h1 style={{
                fontSize:"42px",
                color:"#1E293B",
                marginBottom:"20px",
                fontWeight:"800"
            }}>
                Products Management
            </h1>
                  <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "25px",
  }}
>
  <div>
    <div
      style={{
        display: "flex",
        gap: "12px",
        marginBottom: "10px",
      }}
    >
      <input
        type="text"
        placeholder="Search Product..."
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        style={{
          padding: "12px",
          width: "250px",
          border: "1px solid #CBD5E1",
          borderRadius: "10px",
          outline: "none",
        }}
      />

      <select
      value={sortOption}
      onChange={(e)=>setSortOption(e.target.value)}
        style={{
          padding: "12px",
          border: "1px solid #CBD5E1",
          borderRadius: "10px",
          outline: "none",
        }}
      >
        <option value="">Sort By</option>
        <option value="lowToHigh"> Price Low → High</option>
        <option value="highToLow">Price High → Low</option>
        <option value="aToZ">Name A → Z</option>
        <option value="zToA">Name Z → A</option>
      </select>
    </div>

    <p
      style={{
        marginTop: "10px",
        marginBottom:"20px",
        color: "black",
        fontSize: "18px",
        fontWeight: "500",
      }}
    >
      Total Products : {filteredProducts.length}
    </p>
  </div>

  <button
    onClick={() => {
      setShowForm(!showForm);

      if (!showForm) {
        setEditId(null);

        setProductName("");
        setCategory("");
        setPrice("");
        setOldPrice("");
        setBrand("");
        setImage("");
        setRating("");
        setReviews("");
        setStock("");
        setDescription("");
      }
    }}
    style={{
      background: "linear-gradient(120deg,#7b2ff7,#4d45e8)",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
    }}
  >
    + Add Product
  </button>
</div>

                    
                 
               

            {showForm && (
                <div style={{
                    backgroundColor:"white",
                    padding:"20px",
                    borderRadius:"15px",
                    marginBottom:"20px",
                    boxShadow:"0 4px 15px rgba(0,0,0,0.08)"
                }}>
                    <h2 style={{
                       fontSize: "24px",
                        fontWeight: "700",
                        marginBottom: "20px",
                         color: "#1E293B"
                      }}>
                        {editId ? "Update Product" : "Add New Product"}
                    </h2>

                    <div
                    style={{
                     display: "grid",
                     gridTemplateColumns: "1fr 1fr",
                     gap: "15px",
                     }}
                      >

                    <input type="text"
                    placeholder="Product Name"
                    value={productName} 
                    onChange={(e)=>setProductName(e.target.value)}
                    style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"10px",
                        border:"1px solid #CBD5E1",
                        borderRadius:"10px",
                        outline:"none",
                    }}/>

                    <input type="text" 
                    placeholder="Category"
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"10px",
                        border:"1px solid #CBD5E1",
                        borderRadius:"10px",
                        outline:"none",
                    }}/>

                   <input type="number"
                   placeholder="Price" 
                   value={price}
                   onChange={(e)=> setPrice(e.target.value)}
                   style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"10px",
                        border:"1px solid #CBD5E1",
                        borderRadius:"10px",
                        outline:"none",
                   }}/>

                   <input type="number"
                   placeholder="Old Price" 
                   value={oldPrice}
                   onChange={(e)=>setOldPrice(e.target.value)}
                   style={{
                         width:"100%",
                        padding:"12px",
                        marginBottom:"10px",
                        border:"1px solid #CBD5E1",
                        borderRadius:"10px",
                        outline:"none",
                   }}/>

                   <input type="text" 
                   placeholder="Brand"
                   value={brand}
                   onChange={(e)=>setBrand(e.target.value)}
                   style={{
                    width:"100%",
                        padding:"12px",
                        marginBottom:"10px",
                        border:"1px solid #CBD5E1",
                        borderRadius:"10px",
                        outline:"none",
                   }}/>

                   <input type="text"
                   placeholder="Image URL"
                   value={image}
                   onChange={(e)=>setImage(e.target.value)} 
                   style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"10px",
                        border:"1px solid #CBD5E1",
                        borderRadius:"10px",
                        outline:"none",
                   }}/>

                   <input type="number"
                   placeholder="Rating"
                   value={rating} 
                   onChange={(e)=>setRating(e.target.value)}
                   style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"10px",
                        border:"1px solid #CBD5E1",
                        borderRadius:"10px",
                        outline:"none",
                   }}/>

                   <input type="text" 
                   placeholder="Reviews"
                   value={reviews}
                   onChange={(e)=>setReviews(e.target.value)}
                   style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"10px",
                        border:"1px solid #CBD5E1",
                        borderRadius:"10px",
                        outline:"none",
                   }}/>

                   <input type="number" 
                   placeholder="Stock"
                   value={stock}
                   onChange={(e)=>setStock(e.target.value)}
                   style={{
                    width:"100%",
                        padding:"12px",
                        marginBottom:"10px",
                        border:"1px solid #CBD5E1",
                        borderRadius:"10px",
                        outline:"none",
                   }}/>
                   </div>

                   <textarea 
                   placeholder="Description"
                   value={description}
                   onChange={(e)=>setDescription(e.target.value)}
                   style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"10px",
                        minHeight:"100px",
                        border:"1px solid #CBD5E1",
                        borderRadius:"10px",
                        outline:"none",
                   }}/>

                   <div style={{ marginTop: "10px" }}>
                   <button 
                   onClick={handleAddProduct}
                   style={{
                    background:"linear-gradient(120deg,#7b2ff7,#4d45e8)",
                    color:"white",
                    border:"none",
                    padding:"12px 25px",
                    borderRadius:"10px",
                    cursor:"pointer",
                    fontSize:"15px",
                    fontWeight:"600"
                   }}>
                    {editId ? "Update Product" : "Save Product"}
                   </button>
                   <button
                   onClick={()=>{
                  setShowForm(false);
                    setEditId(null);
                   }}
                   style={{
                   background:"#E2E8F0",
                      color:"#0F172A",
                  border:"none",
                  padding:"12px 25px",
                   borderRadius:"10px",
                  cursor:"pointer",
                   marginLeft:"10px"
               }}>
                   Cancel
               </button>

                </div>
                </div>         
                 )}
            

            <div style={{
                backgroundColor:"white",
                padding:"25px",
                borderRadius:"15px",
                boxShadow:"0 4px 15px rgba(0,0,0,0.08)"
            }}>
                
            {currentProducts.length === 0 ? (
  <p>No products loaded yet.</p>
) : (
  <>
    <table
      style={{
        width: "100%",
        borderCollapse: "separate",
        borderSpacing:"0 8px"
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              borderBottom: "2px solid #e5e7eb",
              padding: "14px",
              backgroundColor: "#EEF2FF",
              color: "#475569",
              fontWeight: "700",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            Product
          </th>

          <th
            style={{
              borderBottom: "2px solid #e5e7eb",
              padding: "14px",
              backgroundColor: "#EEF2FF",
              color: "#475569",
              fontWeight: "700",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            Category
          </th>

          <th
            style={{
              borderBottom: "2px solid #e5e7eb",
              padding: "14px",
              backgroundColor: "#EEF2FF",
              color: "#475569",
              fontWeight: "700",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            Price
          </th>

          <th
            style={{
              borderBottom: "2px solid #e5e7eb",
              padding: "14px",
              backgroundColor: "#EEF2FF",
              color: "#475569",
              fontWeight: "700",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            Stock
          </th>

          <th
            style={{
              borderBottom: "2px solid #e5e7eb",
              padding: "14px",
              backgroundColor: "#EEF2FF",
              color: "#475569",
              fontWeight: "700",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            Status
          </th>

          <th
            style={{
              borderBottom: "2px solid #e5e7eb",
              padding: "14px",
              backgroundColor: "#EEF2FF",
              color: "#475569",
              fontWeight: "700",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {currentProducts.map((product) => (
          <tr key={product.id}>
            <td
              style={{
                padding: "12px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />

                <span>{product.name}</span>
              </div>
            </td>

            <td
              style={{
                padding: " 20px 12px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {product.category}
            </td>

            <td
              style={{
                padding: "20px 12px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              ₹{product.price}
            </td>

            <td
              style={{
                padding: "20px 12px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {product.stock}
            </td>

            <td
              style={{
                padding: "20px 12px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {product.stock > 0 ? (
                <span
                  style={{
                    background: "#DCFCE7",
                    color: "#15803D",
                    padding: "5px 10px",
                    borderRadius: "20px",
                  }}
                >
                  In Stock
                </span>
              ) : (
                <span
                  style={{
                    background: "#FEE2E2",
                    color: "#DC2626",
                    padding: "5px 10px",
                    borderRadius: "20px",
                  }}
                >
                  Out Of Stock
                </span>
              )}
            </td>

            <td>
              <button
                onClick={() => handleEdit(product)}
                style={{
                  backgroundColor: "#f59e0b",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  marginRight: "8px",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginTop: "20px",
  }}
>
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    style={{
      padding: "10px 18px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: "#E2E8F0",
      fontWeight: "600",
    }}
  >
    Previous
  </button>

  <span
    style={{
      fontWeight: "600",
      color: "#334155",
    }}
  >
    Page {currentPage} of {totalPages}
  </span>

  <button
  onClick={() => setCurrentPage(currentPage + 1)}
  disabled={currentPage === totalPages}
  style={{
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    cursor:
      currentPage === totalPages
        ? "not-allowed"
        : "pointer",

    backgroundColor:
      currentPage === totalPages
        ? "#CBD5E1"
        : "#7b2ff7",

    color: "white",
    fontWeight: "600",
  }}
>
  Next
</button>
</div>
    </div>
  </>
)}
</div>
</div>
</AdminLayout>
);
}

export default AdminProductsPage;