import React from "react";
import PropTypes from "prop-types";

const Task = ({ onClick, completed, text, value }) => (
  <li
    data-e2e="Task"
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}: {value}
  </li>
);

Task.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default Task;
