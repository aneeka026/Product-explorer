import { useEffect, useState } from "react";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);


  const removeFromWishlist = (e, id) => {
    e.stopPropagation();

    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <>
      <section className="wishlist-hero">
        <div className="wishlist-overlay">
          <h1>My Wishlist</h1>
        </div>
      </section>

      <section className="wishlist-products">
        {wishlist.length === 0 ? (
            <div className="empty-container">
            <h1 className="empty-title">IT'S TIME TO SHOP ITEMS</h1>
            <p className="empty-text">Tap the heart on a product to save it here.</p>
            <button className="shop-now-btn" onClick={() => navigate("/products")}>
              Shop Now
            </button>
          </div>
        ) : (
          wishlist.map((product) => (
            <div
              className="wishlist-card"
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
            >

              <div
                className="wishlist-heart"
                onClick={(e) => removeFromWishlist(e, product.id)}
              >
                <FaHeart color="red" />
              </div>


              <div className="wishlist-image-wrapper">
                <img src={product.image} alt={product.title} />

                <div className="wishlist-hover-btn">
                  <span>Select Options</span>
                  <FiArrowRight className="arrow-icon" />
                </div>
              </div>

              <h4>{product.title}</h4>
              <p>${product.price}</p>
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default Wishlist;

