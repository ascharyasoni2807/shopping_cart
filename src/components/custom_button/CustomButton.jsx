import React from "react";
import { Button } from "react-bootstrap";

const CustomButton = ({ label, variant, onClick, className }) => (
  <Button
    variant={variant ?? "primary"}
    onClick={onClick}
    className={className}
  >
    {label}
  </Button>
);

export default CustomButton;
