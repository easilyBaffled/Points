import { connect } from "react-redux";
import { actions, getRewardList } from "../state/entities/rewardList";
import RewardList from "../components/RewardList";

const mapStateToProps = state => ({
  rewards: getRewardList(state)
});

const mapDispatchToProps = {
  onRewardClick: actions.buyReward
};

const ConnectedRewardList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RewardList);

export default ConnectedRewardList;
