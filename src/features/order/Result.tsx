import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectOrder } from "./OrderSlice";

export const Result = () => {
  const state = useSelector(selectOrder);

  return (
    <>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <Link to="/">Start over</Link>
    </>
  );
};
