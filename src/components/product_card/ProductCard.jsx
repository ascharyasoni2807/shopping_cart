import React from 'react';
import './ProductCard.css'; 



const ProductCard = ({ product, onAddToCart }) => {
    return (
      <div className="product-card">
        <img src={product.thumbnail} alt={product.title} className="product-image" />
        <div className="product-details">
          <h3>{product.title}</h3> 
          <p>{product.description}</p>
          <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
        </div>
      </div>
    );
  };
  
  export default ProductCard;