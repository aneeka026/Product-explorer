import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import "./ProductDetail.css";


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [size, setSize] = useState("S");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));
  };


  return (
    <div className="product-detail-page">

      <section className="product-hero">
        <div className="product-hero-overlay"></div>
      </section>

      <div className="product-detail">
      
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="detail-info">
          <h1>{product.title}</h1>

          <p className="subtitle">{product.description}</p>

          <div className="price">
            ${product.price}
          </div>

          <button className="add-cart" onClick={() => addToCart(product,size)}  >Add to Cart</button>

          <div className="extra">
            <p>Easy returns within 30 days</p>
          </div>
        </div>

      </div>

      <button className="back-button" onClick={() => window.history.back()}>Back to Home</button>

    </div>
  );
};

export default ProductDetail;
