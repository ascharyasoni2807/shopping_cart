//  in this file we can put all utils functions for reducers

export const addProductToCart = (cart, product) => {
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  if (existingProductIndex !== -1) {
    return cart.map((item, index) => {
      if (index === existingProductIndex) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
  } else {
    return [...cart, { ...product, quantity: 1 }];
  }
};

export const removeProductFromCart = (cart, productId) => {
  const productIndex = cart.findIndex((item) => item.id === productId);
  if (productIndex !== -1) {
    const updatedCart = [...cart];
    if (updatedCart[productIndex].quantity > 1) {
      updatedCart[productIndex] = {
        ...updatedCart[productIndex],
        quantity: updatedCart[productIndex].quantity - 1,
      };
    } else {
      updatedCart.splice(productIndex, 1);
    }
    return updatedCart;
  }
  return cart;
};
