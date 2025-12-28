import "./About.css";

const About = () => {
  return (
    <>
      <section className="about-hero">
        <div className="about-overlay"></div>
        <h1>Our Story</h1>
      </section>

      <section className="about-content">
        <div className="about-left">
          <h2>Our Vision</h2>
        </div>

        <div className="about-right">
          <p>
            Product Explorer began with a quiet idea: clothing should not chase trends,
            but exist beyond them. From the very start, our goal was to create
            pieces that hold their value through time — garments that remain
            relevant, season after season.
          </p>

          <p>
            We believe in simplicity, craftsmanship, and thoughtful design.
            Every piece is made with intention, focusing on quality materials
            and timeless silhouettes rather than fast fashion cycles.
          </p>
        </div>
      </section>

      <section className="about-content border-top">
        <div className="about-left">
          <h2>Our Mision</h2>
        </div>

        <div className="about-right">
          <p>
            We exist to create thoughtful pieces designed to be worn, loved, and lived in. Every garment is made with attention to detail, embracing slow fashion principles that respect both people and planet.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
