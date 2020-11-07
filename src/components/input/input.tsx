import React from "react";
import { TableParameter } from "../App/App";

interface InputProps {
  data: TableParameter;
  value: string | number;
}

export const Input = (props: InputProps) => {
  return (
    <div className="form-group col-md-3">
      <label htmlFor={props.data.value}>{props.data.title}:</label>
      <input
        className="form-control"
        type={props.data.type}
        id={props.data.value}
        onChange={props.data.cb}
        value={props.value}
      />
    </div>
  );
};
