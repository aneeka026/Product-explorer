import { useEffect, useState } from "react";
import "./Accessories.css";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const Accessories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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



  const fetchAccessories = async () => {
    try {
      const res = await fetch(
        "https://fakestoreapi.com/products/category/jewelery"
      );
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  return (
    <div className="collection-page">

      <section className="collection-hero accessories-hero">
        <h1>Accessories</h1>
      </section>

      <div className="collection-nav">
        <span className="active">All</span>
        <span>Bags</span>
        <span>Watches</span>
        <span>Caps</span>
        <span>Jewelry</span>
      </div>

      <div className="products-grid">
        {loading ? (
          <p className="loading-text">Loading accessories...</p>
        ) : (
          products.map((item) => (
            <div
              className="product-card"
              key={item.id}
              onClick={() => navigate(`/products/${item.id}`)}
            >

              <div
                className="heart-icon"
                onClick={(e) => toggleWishlist(e, item)}
              >
                {likedId.includes(item.id)
                  ? <FaHeart color="red" />
                  : <FiHeart />}
              </div>

              <div className="accessory-image-wrapper">
                <img src={item.image} alt={item.title} />

                <div className="accessory-hover-btn">
                  <span>Select Options</span>
                  <FiArrowRight className="arrow-icon" />
                </div>
              </div>

              <h3>{item.title}</h3>
              <p className="price">₹{Math.round(item.price * 83)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Accessories;
