export const filterProductsByPriceRange = (range, products) => {
  const [min, max] = range.split("-").map(Number);
  if (max === undefined) {
    return products.filter((product) => product.price >= min);
  } else {
    return products.filter(
      (product) => product.price >= min && product.price <= max
    );
  }
};
