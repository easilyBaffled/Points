import { connect } from "react-redux";
import { actions } from "../state/entities/viewFilters";
import Link from "../components/Link";

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(actions.setViewFilter(ownProps.filter));
  }
});

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;
