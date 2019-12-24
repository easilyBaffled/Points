import React from "react";
import Footer from "./Footer";
import AddTodo from "../containers/AddTodo";
import AddReward from "../containers/AddReward";
import VisibleTodoList from "../containers/VisibleTodoList";
import RewardListContainer from "../containers/RewardListContainer";
import { useSelector } from "react-redux";
import Bank from "./Bank";
import _ from "lodash";

const DataLiteral = () => {
  const s = useSelector(s => s);
  const state = {
    ...s,
    tasks: _.reduce(
      s.tasks,
      (acc, v) => ({
        ...acc,
        [Object.keys(acc).length]: { ...v, id: Object.keys(acc).length }
      }),
      {}
    ),
    rewards: _.reduce(
      s.rewards,
      (acc, v) => ({
        ...acc,
        [Object.keys(acc).length]: { ...v, id: Object.keys(acc).length }
      }),
      {}
    )
  };

  return (
    <pre>
      <code>{JSON.stringify(state, null, 4)}</code>
    </pre>
  );
};

const App = () => (
  <div>
    <h1>Tasks</h1>
    <AddTodo />
    <VisibleTodoList />
    <Bank />
    <Footer />
    <h1>Rewards</h1>
    <AddReward />
    <RewardListContainer />
    <DataLiteral />
  </div>
);

export default App;
