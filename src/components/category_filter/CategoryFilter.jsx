import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ALL_CATEGORIES } from "../../constants/constant";

const CategoryFilter = ({
  categories,
  selectedCategory,
  handleCategoryChange,
}) => {
  return (
    <DropdownButton
      id="dropdown"
      title={
        selectedCategory
          ? categories?.find((category) => category?.slug === selectedCategory)
              .name
          : ALL_CATEGORIES
      }
      onSelect={handleCategoryChange}
    >
      <Dropdown.Item>{ALL_CATEGORIES}</Dropdown.Item>
      {categories?.map((category, index) => {
        return (
          <Dropdown.Item key={index} eventKey={category?.slug}>
            {category?.name}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
};

export default CategoryFilter;
