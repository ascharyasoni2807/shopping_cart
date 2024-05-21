import React from "react";
import { Button } from "react-bootstrap";

const CustomButton = ({ label, variant, onClick, className }) => (
  <Button variant={variant} onClick={onClick} className={className}>
    {label}
  </Button>
);

export default CustomButton;
