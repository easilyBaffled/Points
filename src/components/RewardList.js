import React from "react";
import PropTypes from "prop-types";
import Reward from "./Reward";

const RewardList = ({ rewards, onRewardClick }) => (
  <ul>
    {rewards.map(reward => (
      <Reward
        key={reward.id}
        {...reward}
        onClick={() => onRewardClick(reward.id)}
      />
    ))}
  </ul>
);

RewardList.propTypes = {
  rewards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onRewardClick: PropTypes.func.isRequired
};

export default RewardList;
