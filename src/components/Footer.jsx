import "./Footer.css";
import { FiBox, FiRefreshCcw, FiShield, FiUsers } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-features">
        <div className="feature">
          <FiBox />
          <p>Free shipping from $149</p>
        </div>

        <div className="feature">
          <FiRefreshCcw />
          <p>Easy returns within 30 days</p>
        </div>

        <div className="feature">
          <FiShield />
          <p>Secure payments online</p>
        </div>

        <div className="feature">
          <FiUsers />
          <p>24/7 customer support</p>
        </div>
      </div>

      <div className="footer-main">

        <div className="footer-brand">
          <h1>PRODUCT EXPLORER</h1>
          <span>© 2025 All Rights Reserved</span>
        </div>

        <div className="footer-links">
          <div>
            <h4>(Navigation)</h4>
            <a href="/">Home</a>
            <a href="/products">All</a>
            <a href="/for-men">Men</a>
            <a href="/for-women">Women</a>
            <a href="/accessories">Accessories</a>
            <a href="/about">About</a>
          </div>

          <div>
            <h4>(Legal)</h4>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>

          <div>
            <h4>(Help)</h4>
            <a href="/contact">Contact</a>
            <a href="/contact#faq">FAQ</a>
          </div>
        </div>

        <div className="footer-newsletter">
          <p>Subscribe to our newsletter for new arrivals and special offers.</p>
          <div className="newsletter-box">
            <input type="email" placeholder="Your Email" />
            <button>Submit</button>
          </div>
          <small>
            By subscribing, you agree to receive emails and accept our{" "}
            <span>Privacy Policy</span>.
          </small>
        </div>

      </div>

      <div className="footer-bottom">
        <span>VISA</span>
        <span>Mastercard</span>
        <span>PayPal</span>
        <span>G Pay</span>
        <span>Apple Pay</span>
      </div>

    </footer>
  );
};

export default Footer;
