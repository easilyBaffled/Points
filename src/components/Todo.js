import React from "react";
import PropTypes from "prop-types";

const Todo = ({ onClick, completed, text, value }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}: {value}
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default Todo;
