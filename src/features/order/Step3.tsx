import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectCheese, chooseCheese } from "./OrderSlice";

export const Step3 = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cheese = useSelector(selectCheese);
  const { register, handleSubmit } = useForm({ defaultValues: { cheese } });

  const onSubmit = (data: { cheese: any }) => {
    dispatch(chooseCheese(data.cheese));
    history.push("/step4");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="cheese">Pick cheese:</label>
        <select id="cheese" name="cheese" ref={register}>
          <option value="no_cheese">No Cheese</option>
          <option value="mozarella">Mozarella</option>
          <option value="parmigiano">Parmigiano</option>
        </select>
      </div>
      <button>Next</button>
    </form>
  );
};
