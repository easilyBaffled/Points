import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { canAfford } from "../state/entities/bank";

const Reward = ({ onClick, text, value, canAfford }) => (
  <li onClick={onClick}>
    <span style={{ color: canAfford ? "black" : "darkgrey" }}>{text}</span>:{" "}
    {value}
  </li>
);

Reward.propTypes = {
  // onClick: PropTypes.func.isRequired,
  // completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

const ConnectedReward = props => (
  <Reward canAfford={useSelector(canAfford)} {...props} />
);
export default ConnectedReward;
