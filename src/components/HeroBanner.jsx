import bannerImage from "../assets/techmart-banner.png";

function HeroBanner() {
  return (
    <section
      style={{
        maxWidth:"1400px",
        margin: "20px auto",
        borderRadius: "20px",
        overflow: "hidden",
        background: "linear-gradient(120deg, #7b2ff7, #4d45e8, #168bea)",
      }}
    >
      <img
        src={bannerImage}
        alt="TechMart promotional banner"
        style={{
          width: "100%",
          display: "block",
        }}
      />
    </section>
  );
}

export default HeroBanner;