import "./ProductCard.css";

import React from "react";
import { ADD_TO_CART } from "../../constants/constant";
import CustomButton from "../custom_button/CustomButton";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-image"
      />
      <div className="product-details">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <p>Rating: {product.rating} ⭐</p>
        <p>Stock: {product.stock}</p>
        <CustomButton
          variant={"primary"}
          onClick={() => onAddToCart(product.id)}
          label={ADD_TO_CART}
          className={"product__add-to-cart"}
        />
      </div>
    </div>
  );
};

export default ProductCard;
