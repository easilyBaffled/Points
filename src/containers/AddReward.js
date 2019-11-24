import React, { useState } from "react";
import { connect } from "react-redux";
import { actions } from "../state/entities/rewardList.js";

let AddReward = ({ dispatch }) => {
  const [text, setText] = useState();
  const [value, setValue] = useState(1);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(actions.addReward({ text, value }));
          setText("");
          setValue("");
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
          Add Reward
        </button>
      </form>
    </div>
  );
};
AddReward = connect()(AddReward);

export default AddReward;
