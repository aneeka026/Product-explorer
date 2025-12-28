export const getWishlist = () => {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
};

export const saveWishlist = (list) => {
  localStorage.setItem("wishlist", JSON.stringify(list));
};
