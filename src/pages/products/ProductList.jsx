import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductCard from "../../components/product_card/ProductCard";
import {
  addToCart,
  fetchCategories,
  fetchProductList,
} from "../../redux/actions/action";
import { Col, Row, Button, Badge } from "react-bootstrap";
import CheckOutModal from "../../components/checkout_modal/CheckOutModal";
import { CHECKOUT, NO_PRODUCTS, PRODUCT_LIST } from "../../constants/constant";
import "./ProductList.css";
import LoadingSpinner from "../../components/custom_spinner/LoadingSpinner";
import PriceFilter from "../../components/price_filter/PriceFilter";
import { filterProductsByPriceRange } from "../../utils/utils";
import CategoryFilter from "../../components/category_filter/CategoryFilter";

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
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  useEffect(() => {
    console.log(selectedCategory);
    if (selectedCategory) {
      fetchProductList(selectedCategory);
    } else {
      fetchProductList();
      fetchCategories();
    }
    // eslint-disable-next-line
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

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  let filteredProducts = products;
  if (selectedPriceRange) {
    filteredProducts = filterProductsByPriceRange(selectedPriceRange, products);
  }

  const totalCartItems = cart?.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <div>
      <div
        className={`page-header d-flex justify-content-between align-items-center mb-4`}
      >
        <h2>{PRODUCT_LIST}</h2>
        <Row>
          <Col>
            <PriceFilter handlePriceRangeChange={handlePriceRangeChange} />
          </Col>
          <Col>
            <CategoryFilter
              categories={categories}
              handleCategoryChange={handleCategoryChange}
              selectedCategory={selectedCategory}
            />
          </Col>
          <Col>
            <Button
              variant="primary"
              onClick={handleCheckout}
              className="product__checkout-btn"
            >
              {CHECKOUT} <Badge bg="danger">{totalCartItems}</Badge>
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
