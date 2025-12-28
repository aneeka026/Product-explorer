export const addToCart = (product, size = "S") => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(
    (item) => item.id === product.id && item.size === size
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size,
      qty: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));
};

