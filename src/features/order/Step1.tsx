import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { chooseBase, selectBase } from "./OrderSlice";

export const Step1 = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const base = useSelector(selectBase);
  const { register, handleSubmit } = useForm({ defaultValues: { base } });

  const onSubmit = (data: { base: any }) => {
    dispatch(chooseBase(data.base));
    history.push("/step2");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="base">Pick base:</label>
        <select id="base" name="base" ref={register}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <button>Next</button>
    </form>
  );
};
