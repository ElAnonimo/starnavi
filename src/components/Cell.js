import React from "react";
import PropTypes from "prop-types";
import "./Cell.scss";

const Cell = ({ className, onMouseOver }) => {
  return (
    <div className={`cell ${className}`} onMouseOver={onMouseOver} />
  );
};

Cell.propTypes = {
  className: PropTypes.string.isRequired,
  onMouseOver: PropTypes.func.isRequired
};

export default Cell;
