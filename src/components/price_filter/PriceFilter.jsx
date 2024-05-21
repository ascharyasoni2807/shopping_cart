import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const PriceFilter = ({ handlePriceRangeChange }) => {
  const handleOnChange = (eventKey) => {
    setSelectedRange(eventKey);
    handlePriceRangeChange(eventKey);
  };
  const [selectedRange, setSelectedRange] = useState("");
  return (
    <DropdownButton
      id="dropdown"
      title={selectedRange ? selectedRange : "Price Range"}
      onSelect={handleOnChange}
    >
      <Dropdown.Item eventKey="">All Prices</Dropdown.Item>
      <Dropdown.Item eventKey="100-500">$100 - $500</Dropdown.Item>
      <Dropdown.Item eventKey="500-1000">$500 - $1000</Dropdown.Item>
      <Dropdown.Item eventKey="1000-2000">$1000 - $2000</Dropdown.Item>
      <Dropdown.Item eventKey="2000-">$2000 and above</Dropdown.Item>
    </DropdownButton>
  );
};

export default PriceFilter;
