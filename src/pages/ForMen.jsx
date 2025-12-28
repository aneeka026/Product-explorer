import { useEffect, useState } from "react";
import "./ForMen.css";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const ForMen = () => {
  const [menProducts, setMenProducts] = useState([]);
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

  const fetchMenProducts = async () => {
    try {
      const res = await fetch(
        "https://fakestoreapi.com/products/category/men's clothing"
      );
      const data = await res.json();
      setMenProducts(data);
    } catch (error) {
      console.error("Error fetching men products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenProducts();
  }, []);

  return (
    <>
      <section className="men-hero">
        <div className="men-overlay">
          <h1>For Men</h1>
        </div>
      </section>

      <div className="men-nav">
        <span className="active">All</span>
        <span>T-Shirt</span>
        <span>Polo Shirt</span>
        <span>Pants</span>
        <span>New Arrivals</span>
        <span>Sale</span>
      </div>

      <section className="men-products">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          menProducts.map((product) => (
            <div
              className="men-card"
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
              
              <div className="men-image-wrapper">
                <img src={product.image} alt={product.title} />

                <div className="men-hover-btn">
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

export default ForMen;
