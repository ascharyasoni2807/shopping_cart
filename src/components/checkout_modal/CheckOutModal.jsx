// CheckoutModal.js
import React from "react";
import { connect } from "react-redux";
import { Modal, Badge, ListGroup } from "react-bootstrap";
import { removeFromCart } from "../../redux/actions/action";
import {
  CHECKOUT,
  CLOSE,
  PROCEED_TO_CHECKOUT,
  REMOVE,
  TOTAL,
} from "../../constants/constant";
import CustomButton from "../custom_button/CustomButton";

export const CheckoutModal = ({
  show,
  handleClose,
  cart,
  totalAmount,
  removeFromCart,
}) => {
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  // Calculate total count of products in the cart
  const totalCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{CHECKOUT}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {cart?.map((product) => (
            <ListGroup.Item key={product?.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{product?.title}</h5>
                  <p>
                    ${product?.price} x {product?.quantity}
                  </p>
                </div>
                <CustomButton
                  variant="danger"
                  onClick={() => handleRemoveFromCart(product?.id)}
                  label={REMOVE}
                />
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h5 className="mt-3">
          {TOTAL}: ${totalAmount?.toFixed(2)}
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton variant="secondary" onClick={handleClose} label={CLOSE} />
        <CustomButton
          variant="primary"
          onClick={handleClose}
          label={PROCEED_TO_CHECKOUT}
        />
      </Modal.Footer>
      <Badge bg="secondary">{totalCount}</Badge>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  totalAmount: state.cartReducer.cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  ),
});

const mapDispatchToProps = {
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutModal);
