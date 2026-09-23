function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#111827",
        color: "#ffffff",
        padding: "50px 60px 20px",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {/* TechMart */}
        <div>
          <h2
            style={{
              marginBottom: "15px",
            }}
          >
            TechMart
          </h2>

          <p
            style={{
              color: "#d1d5db",
              maxWidth: "250px",
              lineHeight: "1.6",
            }}
          >
            Your one-stop destination for mobiles,
            laptops, accessories, smart watches and
            other latest gadgets.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>

          <p>Home</p>
          <p>Products</p>
          <p>Categories</p>
          <p>Offers</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3>Customer Service</h3>

          <p>Contact Us</p>
          <p>FAQs</p>
          <p>Returns</p>
          <p>Privacy Policy</p>
        </div>

        {/* Contact */}
        <div>
          <h3>Contact Us</h3>

          <p>📍 Kerala, India</p>
          <p>📞 +91 9876543210</p>
          <p>✉ support@techmart.com</p>
        </div>
      </div>

      <hr
        style={{
          margin: "30px 0 20px",
          border: "0.5px solid #374151",
        }}
      />

      <p
        style={{
          textAlign: "center",
          color: "#9ca3af",
        }}
      >
        © 2026 TechMart. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;