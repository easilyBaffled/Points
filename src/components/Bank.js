import React from "react";
import { useSelector } from "react-redux";
import { getBankValue } from "../state/entities/bank";

export const Bank = ({ amount }) => <h1 id="bank">{amount}</h1>;

const ConnectedBank = props => {
  const amount = useSelector(getBankValue);
  return <Bank {...props} amount={amount} />;
};

export default ConnectedBank;
