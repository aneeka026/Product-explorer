import React from 'react'
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const socialImages = [
  "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
   "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  "https://images.unsplash.com/photo-1488161628813-04466f872be2",
  "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  "https://images.unsplash.com/photo-1517849845537-4d257902454a",
];

const Home = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=3"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch popular products");
        }
        const data = await response.json();
        setPopularProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
  <>
    {/* section1 */}
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content fade-in">
        <span className="hero-tag">(Featured Collection)</span>
        <h1>
          Discover the Art of <br />
          <span>Luxury Shopping</span>
        </h1>
      </div>

      <div className='shop-btn-wrapper'>
        <Link to="/products" className='shop-btn'>
          Shop Now <span>→</span> 
        </Link>
      </div>
    </section>

    {/* section2 */}
      <section className="popular-section">
        <p className="popular-tag">(Bestsellers)</p>

        <h2 className="popular-title">
          Most Popular
        </h2>

        {loading && <p>Loading...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div className="popular-grid">
            {popularProducts.map((product) => (
              <Link
                to={`/products/${product.id}`}
                className="popular-card"
                key={product.id}
              >
                <div className='image-wrapper'>
                  <img src={product.image} alt={product.title} />

                  <div className="hover-btn">
                    <span>Select Options</span>
                    <FiArrowRight className="arrow-icon" />
                  </div>
                </div>

                <div className="product-info">
                  <h4>{product.title}</h4>
                  <p>${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    {/* section3 */}
    <section className="collection-section">
      <div className="collection-card men">
        <div className="overlay">
          <h2>Men’s<br />Collection</h2>
          <button className="shop-btn"
            onClick={()=> navigate("/for-men")}>
            Shop Now <span>→</span>
          </button>
        </div>
      </div>

      <div className="collection-card women">
        <div className="overlay">
          <h2>Women’s<br />Collection</h2>
          <button className="shop-btn"
            onClick={()=> navigate("/for-women")}>
            Shop Now <span>→</span>
          </button>
        </div>
      </div>
    </section>

    {/* section4 - Social Slider */}
    <section className="social-section">
      <p className="social-tag">(Socials)</p>

      <h2 className="social-title">
        Follow us on social media <br />
        <span>@productexplorer</span> for updates
      </h2>

      <div className="social-slider">
        <div className="social-track">
          {socialImages.concat(socialImages).map((img, index) => (
          <div className="social-card" key={index}>
            <img src={img} alt="social" />
            </div>
          ))}
        </div>
      </div>
    </section>

  </>
  );
};

export default Home;
