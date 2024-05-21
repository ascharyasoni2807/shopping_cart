import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import ProductCard from '../../components/product_card/ProductCard';
import { addToCart, fetchOrLoadMoreProducts, removeFromCart } from '../../redux/actions/action';
import { Col, Row, Button, Badge } from 'react-bootstrap';
import CheckOutModal from '../../components/checkout_modal/CheckOutModal';



const ProductList = ({ products, loading, fetchOrLoadMoreProducts, addToCart, cart,removeFromCart }) => {

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetchOrLoadMoreProducts();
  }, [fetchOrLoadMoreProducts]);

  const handleAddToCart = (product) => {
    console.log(product)
    addToCart(product);
  };


  const handleCheckout = () => {
    setShowModal(true);
  };
  const totalCount = cart?.reduce((total, product) => total + product.quantity, 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Product List</h2>
        <Button variant="primary" onClick={handleCheckout}>
          Checkout <Badge bg="secondary">{totalCount}</Badge>
        </Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="gx-4 gy-4">
          {products?.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} onAddToCart={()=> handleAddToCart(product)} />
            </Col>
          ))}
        </Row>
      )}
    { showModal && <CheckOutModal show={showModal} handleClose={() => setShowModal(false)} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
        products: state.productReducer.products,
        loading: state.productReducer.loading,
        cart: state.cartReducer.cart,
      });


const mapDispatchToProps = {
  fetchOrLoadMoreProducts,
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
