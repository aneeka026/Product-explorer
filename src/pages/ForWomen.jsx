import { useEffect, useState } from "react";
import "./ForWomen.css";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const ForWomen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [likedId, setLikedId] = useState([]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLikedId(wishlist.map(item => item.id));
  }, []);

  const toggleWishlist = (e, product) => {
    e.stopPropagation();

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(item => item.id === product.id);

    if (exists) {
      wishlist = wishlist.filter(item => item.id !== product.id);
    } else {
      wishlist.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setLikedId(wishlist.map(item => item.id));

    window.dispatchEvent(new Event("wishlistUpdated"));

  };

  const fetchWomenProducts = async () => {
    try {
      const res = await fetch(
        "https://fakestoreapi.com/products/category/women's%20clothing"
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWomenProducts();
  }, []);

  return (
    <div className="women-page">

      <section className="women-hero women-overlay">
        <h1>For Women</h1>
      </section>

      <div className="women-nav">
        <span className="active">All</span>
        <span>Dresses</span>
        <span>Tops</span>
        <span>Pants</span>
        <span>New Arrivals</span>
        <span>Sale</span>
      </div>

      <div className="women-products">
        {loading && <p>Loading products...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div className="women-grid">
            {products.map((product) => (
              <div
                className="women-card"
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
              >

                <div
                  className="heart-icon"
                  onClick={(e) => toggleWishlist(e, product)}
                >
                 {likedId.includes(product.id)
                  ? <FaHeart color="red" />
                  : <FiHeart />}
                </div>

                <div className="women-image-wrapper">
                  <img src={product.image} alt={product.title} />

                  <div className="women-hover-btn">
                    <span>Select Options</span>
                    <FiArrowRight className="arrow-icon" />
                  </div>
                </div>

                <h4>{product.title}</h4>
                <p>${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForWomen;
