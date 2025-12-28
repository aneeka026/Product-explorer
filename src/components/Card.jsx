import React, { useEffect, useState } from "react";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import "./Card.css";

const Card = ({ product, onClick }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {   // Check product already wishlist me hai ya nahi
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLiked(wishlist.some(item => item.id === product.id));
  }, [product.id]);


  const toggleWishlist = (e) => {   //  Toggle Wishlist
    e.stopPropagation();

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find(item => item.id === product.id);

    if (exists) {
      wishlist = wishlist.filter(item => item.id !== product.id);
      setLiked(false);
    } else {
      wishlist.push(product);
      setLiked(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <div className="card" onClick={onClick}>
      
      <div className="card-heart" onClick={toggleWishlist}>
        {liked ? <FaHeart color="red" /> : <FiHeart />}
      </div>

      <div className="image-wrapper">
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

    </div>
  );
};

export default Card;
