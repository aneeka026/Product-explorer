import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ForMen from "./pages/ForMen";
import ForWomen from "./pages/ForWomen";
import Accessories from "./pages/Accessories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Wishlist from "./pages/Wishlist";

const App = () => {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/for-men" element={<ForMen />} />
          <Route path="/for-women" element={<ForWomen />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
