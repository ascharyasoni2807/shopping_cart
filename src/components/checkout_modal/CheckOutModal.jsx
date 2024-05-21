// CheckoutModal.js
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Badge, ListGroup } from 'react-bootstrap';
import { removeFromCart } from '../../redux/actions/action';

export const CheckoutModal = ({ show, handleClose, cart, totalAmount, removeFromCart }) => {
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  // Calculate total count of products in the cart
  const totalCount = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {cart?.map((product) => (
            <ListGroup.Item key={product?.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{product?.title}</h5>
                  <p>${product?.price} x {product?.quantity}</p>
                </div>
                <Button variant="danger" onClick={() => handleRemoveFromCart(product?.id)}>Remove</Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h5 className="mt-3">Total: ${totalAmount?.toFixed(2)}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary">Proceed to Checkout</Button>
      </Modal.Footer>
      <Badge bg="secondary">{totalCount}</Badge> // Display total count in the badge
    </Modal>
  );
};

const mapStateToProps = (state) =>{

  console.log(state)
  return  ({
    cart: state.cartReducer.cart,
    totalAmount: state.cartReducer.cart.reduce((total, product) => total + (product.price * product.quantity), 0),
  });
}

const mapDispatchToProps = {
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutModal);
