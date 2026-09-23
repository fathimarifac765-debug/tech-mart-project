import { useNavigate } from "react-router-dom";

function CategoryMenu({
  selectedCategory,
  setSelectedCategory
}) {
  const categories = [
    "Mobiles",
    "Laptops",
    "Smart Watches",
    "Headphones",
    "Accessories",
    "Tablets",
    "Offers",
    "Brands",
  ];

  const navigate = useNavigate()

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "15px 30px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between",
          gap: "40px",
          flexWrap:"wrap"
        }}
      >
        <button
        onClick={()=>{
          setSelectedCategory("All");
          navigate("category/All");
        }}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "14px 24px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ☰ All Categories
        </button>

         {categories.map((item) => (
          <span
            key={item}
            onClick={() =>{
              setSelectedCategory(item);
              navigate(`category/${item}`);
            }}
            style={{
              fontSize: "16px",
              fontWeight:
                selectedCategory === item
                  ? "700"
                  : "500",
              color:
                selectedCategory === item
                  ? "#2563eb"
                  : "#111827",
              cursor: "pointer",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default CategoryMenu;