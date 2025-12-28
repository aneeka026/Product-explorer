import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiMenu } from "react-icons/fi";
import CartDrawer from "./CartDrawer";
import "./Navbar.css";
import { FiHeart } from "react-icons/fi"; 
import { FaHeart } from "react-icons/fa";  

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false); //search state
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);
  const searchRef = useRef();
  const navigate = useNavigate();
  const [wishlistCount, setWishlistCount] = useState(0); // Wishlist count state
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state

  useEffect(()=>{
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

     handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => { // Cart count update 
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);


  useEffect(() => { // Fetch all products for search
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => { // Search logic
    if (!query) {
      setResults([]);
      return;
    }

    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered.slice(0, 5)); // top 5 suggestions
  }, [query, products]);

  useEffect(() => { // Close search on outside click
    const close = (e) => {
      if (!searchRef.current?.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => { // Wishlist count update
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount();

    window.addEventListener("wishlistUpdated", updateWishlistCount);
    window.addEventListener("storage", updateWishlistCount);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
      window.removeEventListener("storage", updateWishlistCount);
    };
  }, []);


  return (
    <>
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className='nav-left'>
        <FiMenu 
          className="nav-icon mobile-only"
          onClick={()=>setMenuOpen(true)} 
        />

        <div className='desktop-only'>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>Products</NavLink>
          <NavLink to="/about"  className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
        </div>
      </div>

      <div className="nav-center">
        PRODUCT EXPLORER
      </div>

      <div className="nav-right" id='navright-icon' ref={searchRef}>
        <FiSearch 
          className="nav-icon"
          onClick={()=>setShowSearch(prev=>!prev)} 
        />

          {showSearch && (
           <div className="nav-search">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
 
            {results.length > 0 && (
             <ul className="search-results">
              {results.map(item => (
               <li
                key={item.id}
                onClick={() => {
                 navigate(`/products/${item.id}`);
                 setShowSearch(false);
                 setQuery("");
                }}
                >
              <img src={item.image} alt={item.title} />
              <span>{item.title}</span>
            </li>
            ))}
            </ul>
            )}
          </div>
         )}

        <div className="nav-cart" onClick={() => navigate("/wishlist")}>
          <FiHeart className="nav-icon" />
          {wishlistCount > 0 && (
            <span className="cart-badge">{wishlistCount}</span>
          )}
        </div>

        <div className="nav-cart" onClick={() => setCartOpen(true)}>
          <FiShoppingCart className="nav-icon" />
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>

      </div>

    </header>


    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

    <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={() => setMenuOpen(false)}>X</button>
      <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>Home</NavLink>
      <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>Products</NavLink>
      <NavLink to="/about"  className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>About</NavLink>
      <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>Contact</NavLink>
    </div>

    {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}

  </>
  )
}

export default Navbar
