import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import "./CartDrawer.css";

const CartDrawer = ({ open, onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {   // load cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, [open]);

  const subtotal = cartItems
  .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  


  const updateQuantity = (id, type) => {   // update quantity of item
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: type === "inc"
          ? item.quantity + 1
          : Math.max(1, item.quantity - 1)
        };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  const removeItem = (id) => { // remove item from cart
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      {open && <div className="cart-overlay" onClick={onClose}></div>}

      <div className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your cart</h2>
          <FiX 
            className="close-icon" 
            onClick={()=>{
              console.log("close clicked");
              onClose();
            }} />
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <>
              <p className="empty">Your cart is empty</p>
              <span>Add some items to the cart.</span>
            </>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />

                <div className="item-info">
                  <h4>{item.title}</h4>
                  <span>${item.price}</span>

                  <div className="qty">
              <button onClick={() => updateQuantity(item.id, "dec")}>−</button>
            <span>{item.quantity}</span>
           <button onClick={() => updateQuantity(item.id, "inc")}>+</button>
             </div>

                </div>

                <FiX className="remove" onClick={() => removeItem(item.id)} />

              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="row">
              <span>Shipping</span>
              <span>At Checkout</span>
            </div>
            <div className="row total">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <button className="checkout-btn">Checkout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;

