import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductCard from "../../components/product_card/ProductCard";
import {
  addToCart,
  fetchCategories,
  fetchProductList,
} from "../../redux/actions/action";
import {
  Col,
  Row,
  Button,
  Badge,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import CheckOutModal from "../../components/checkout_modal/CheckOutModal";
import {
  ALL_CATEGORIES,
  CHECKOUT,
  NO_PRODUCTS,
  PRODUCT_LIST,
} from "../../constants/constant";
import "./ProductList.css";
import LoadingSpinner from "../../components/custom_spinner/LoadingSpinner";

const ProductList = ({
  products,
  loading,
  fetchProductList,
  fetchCategories,
  addToCart,
  cart,
  categories,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchProductList();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProductList(selectedCategory);
    } else {
      fetchProductList();
    }
  }, [selectedCategory]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const totalCount = cart?.reduce(
    (total, product) => total + product.quantity,
    0
  );
  console.log(categories);
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;
  return (
    <div>
      <div
        className={`page-header d-flex justify-content-between align-items-center mb-4`}
      >
        <h2>{PRODUCT_LIST}</h2>
        <Row>
          <Col>
            <DropdownButton
              id="dropdown-basic-button"
              title={
                selectedCategory
                  ? categories.find((category) => category === selectedCategory)
                  : "All Categories"
              }
              onSelect={handleCategoryChange}
            >
              <Dropdown.Item eventKey={"all_categories"}>
                {ALL_CATEGORIES}
              </Dropdown.Item>
              {categories.map((category, index) => (
                <Dropdown.Item key={index} eventKey={category.toLowerCase()}>
                  {category}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleCheckout}>
              {CHECKOUT} <Badge bg="danger">{totalCount}</Badge>
            </Button>
          </Col>
        </Row>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="product-wrapper">
          <Row xs={1} md={2} lg={3} xl={4} className="gx-4 gy-4">
            {filteredProducts.length > 0 ? (
              filteredProducts?.map((product) => (
                <Col key={product.id}>
                  <ProductCard
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                </Col>
              ))
            ) : (
              <div className="product__empty-list">{NO_PRODUCTS}</div>
            )}
          </Row>
        </div>
      )}
      {showModal && (
        <CheckOutModal
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  loading: state.productReducer.loading,
  cart: state.cartReducer.cart,
  categories: state.categoriesReducer.categories,
});

const mapDispatchToProps = {
  fetchProductList,
  addToCart,
  fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
