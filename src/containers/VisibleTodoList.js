import _ from "lodash";
import { connect } from "react-redux";
import { actions } from "../state/entities/taskList";
import TaskList from "../components/TaskList";

const getVisibleTodos = (tasks, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return tasks;
    case "SHOW_COMPLETED":
      return _.pickBy(tasks, { completed: true });
    case "SHOW_ACTIVE":
      return _.pickBy(tasks, { completed: false });
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => ({
  tasks: Object.values(getVisibleTodos(state.tasks, state.visibilityFilter))
});

const mapDispatchToProps = {
  onTodoClick: actions.toggleComplete
};

const VisibleTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);

export default VisibleTaskList;
