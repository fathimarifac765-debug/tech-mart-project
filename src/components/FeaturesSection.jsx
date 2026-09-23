function FeaturesSection() {
  const features = [
    {
      icon: "🚚",
      title: "Free Delivery",
      text: "On orders above ₹499",
    },
    {
      icon: "🔒",
      title: "Secure Payments",
      text: "100% secure payments",
    },
    {
      icon: "🔄",
      title: "Easy Returns",
      text: "7 days return policy",
    },
    {
      icon: "💰",
      title: "Best Price",
      text: "Guaranteed best price",
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      text: "Dedicated support",
    },
  ];

  return (
    <div
      style={{
        padding: "30px 60px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          padding: "25px 20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          width: "100%",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "0 15px",
              borderRight:
                index !== features.length - 1
                  ? "1px solid #e5e7eb"
                  : "none",
            }}
          >
            <div
              style={{
                fontSize: "32px",
              }}
            >
              {feature.icon}
            </div>

            <div>
              <h4
                style={{
                  margin: 0,
                  fontSize: "17px",
                  fontWeight: "700",
                  color: "#222",
                }}
              >
                {feature.title}
              </h4>

              <p
                style={{
                  margin: "5px 0 0 0",
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                {feature.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesSection;