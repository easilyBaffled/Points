import React from "react";
import Footer from "./Footer";
import AddTodo from "../containers/AddTodo";
import AddReward from "../containers/AddReward";
import VisibleTodoList from "../containers/VisibleTodoList";
import RewardListContainer from "../containers/RewardListContainer";
import { useSelector } from "react-redux";
import Bank from "./Bank";
import ErrorBoundary from "./ErrorBoundary";

const DataLiteral = () => {
  const s = useSelector(s => s);
  const state = { ...s, todos: s.todos.map((t, i) => ({ ...t, id: i })) };

  return (
    <pre>
      <code>{JSON.stringify(state, null, 4)}</code>
    </pre>
  );
};

const App = () => (
  <ErrorBoundary>
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
  </ErrorBoundary>
);

export default App;
