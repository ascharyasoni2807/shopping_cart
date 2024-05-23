import "./ProductCard.css";

import React, { useMemo } from "react";
import { ADD_TO_CART, RATINGS, STOCKS } from "../../constants/constant";
import CustomButton from "../custom_button/CustomButton";
import { addToCart, removeFromCart } from "../../redux/actions/action";
import { connect } from "react-redux";

const ProductCard = ({ product, addToCart, removeFromCart, cart }) => {
  const cartQuantity = useMemo(() => {
    const cartProduct = cart.find((item) => item.id === product.id);
    if (cartProduct) {
      return cartProduct.quantity;
    } else {
      return 0;
    }
  }, [cart, product]);

  const handleIncrement = () => {
    addToCart(product);
  };

  const handleDecrement = () => {
    if (cartQuantity > 0) {
      removeFromCart(product?.id);
    }
  };

  return (
    <div className="product-card">
      <h6>{product?.title}</h6>
      <img
        src={product?.thumbnail}
        alt={"dummy"}
        className="product-card__image"
      />
      <div className="product-details">
        <p className="product-description">{product?.description}</p>
        <p>${product?.price}</p>
        <p>
          {" "}
          {RATINGS}: {product?.rating} ⭐{" "}
        </p>
        <p>
          {" "}
          {STOCKS}: {product?.stock}
        </p>
      </div>
      {cartQuantity === 0 ? (
        <CustomButton
          variant={"primary"}
          onClick={handleIncrement}
          label={ADD_TO_CART}
          className={"product__add-to-cart"}
        />
      ) : (
        <div className="product-card__quantity-selector">
          <CustomButton
            variant="primary"
            onClick={handleDecrement}
            label={"-"}
            className={"product-card__quantity-button"}
          />
          <span>{cartQuantity}</span>
          <CustomButton
            variant="primary"
            onClick={handleIncrement}
            label={"+"}
            className={"product-card__quantity-button"}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
});

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
