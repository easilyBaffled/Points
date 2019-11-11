import React from "react";
import Footer from "./Footer";
import AddTodo from "../containers/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";
import { useSelector } from "react-redux";

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
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <DataLiteral />
  </div>
);

export default App;
