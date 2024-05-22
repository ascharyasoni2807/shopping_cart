import "./ProductCard.css";

import React from "react";
import { ADD_TO_CART, RATINGS, STOCKS } from "../../constants/constant";
import CustomButton from "../custom_button/CustomButton";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <h4>{product?.title}</h4>
      <img
        src={product?.thumbnail}
        alt={"dummy"}
        className="product-card__image"
      />
      <div className="product-details">
        <p className="product-description">{product?.description}</p>
        <p>${product?.price}</p>
        <p> {RATINGS}: {product?.rating} ⭐ </p>
        <p> {STOCKS}: {product?.stock}</p>
      </div>
      <CustomButton
        variant={"primary"}
        onClick={() => onAddToCart(product?.id)}
        label={ADD_TO_CART}
        className={"product__add-to-cart"}
      />
    </div>
  );
};

export default ProductCard;
