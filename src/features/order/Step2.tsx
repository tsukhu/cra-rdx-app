import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectCrust, chooseCrust } from "./OrderSlice";

export const Step2 = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const crust = useSelector(selectCrust);
  const { register, handleSubmit } = useForm({ defaultValues: { crust } });

  const onSubmit = (data: { crust: any }) => {
    dispatch(chooseCrust(data.crust));
    history.push("/step3");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="crust">Pick crust:</label>
        <select id="crust" name="crust" ref={register}>
          <option value="classic_thin">Classic Thin</option>
          <option value="deep_pan">Deep Pan</option>
          <option value="filled_crust">Filled Crust</option>
        </select>
      </div>
      <button>Next</button>
    </form>
  );
};
