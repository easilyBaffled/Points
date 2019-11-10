import React, { useState } from "react";
import { connect } from "react-redux";
import { actions } from "../state/entities/todoList.js";

let AddTodo = ({ dispatch }) => {
  const [text, setText] = useState();
  const [value, setValue] = useState();

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(actions.addTodo({ text, value }));
          setText();
          setValue();
        }}
      >
        <input onChange={e => setText(e.target.value)} />
        <input onChange={e => setValue(e.target.value)} />
        {text}
        <button type="submit" disabled={!text}>
          Add Todo
        </button>
      </form>
    </div>
  );
};
AddTodo = connect()(AddTodo);

export default AddTodo;
