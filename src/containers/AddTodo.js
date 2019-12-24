import React, { useState } from "react";
import { connect } from "react-redux";
import { actions } from "../state/entities/taskList.js";

let AddTodo = ({ dispatch }) => {
  const [text, setText] = useState("");
  const [value, setValue] = useState(1);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(actions.addTodo({ text, value }));
          setText("");
          setValue(1);
        }}
      >
        <input
          type="text"
          onChange={e => setText(e.target.value)}
          value={text}
        />
        <input
          type="text"
          onChange={e => setValue(e.target.value)}
          value={value}
        />

        <button type="submit" disabled={!text}>
          Add Todo
        </button>
      </form>
    </div>
  );
};
AddTodo = connect()(AddTodo);

export default AddTodo;
