import React from "react";
import Footer from "./Footer";
import AddTodo from "../containers/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";
import { useSelector } from "react-redux";

const DataLiteral = () => {
  const s = useSelector(s => s);
  return (
    <pre>
      <code>{JSON.stringify(s, null, 4)}</code>
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
