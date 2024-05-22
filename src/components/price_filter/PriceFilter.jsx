import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { priceRanges } from "../../constants/constant";
import { getPriceRangeLabel } from "../../utils/utils";

const PriceFilter = ({ handlePriceRangeChange }) => {
  const [selectedRange, setSelectedRange] = useState("");
  const handleOnChange = (eventKey) => {
    setSelectedRange(eventKey);
    handlePriceRangeChange(eventKey);
  };
  return (
    <DropdownButton
      id="dropdown"
      title={getPriceRangeLabel(selectedRange)}
      onSelect={handleOnChange}
    >
      {priceRanges?.map((range) => (
        <Dropdown.Item key={range.eventKey} eventKey={range.eventKey}>
          {range.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default PriceFilter;
