import React from "react";
import { TableParameter } from "../App/App";
import { ButtonsList } from "../buttons-list/buttons-list";
import { Input } from "../input/input";
import {  Book, btnProp } from "../models";

interface FormProps {
  btnData: Array<btnProp>;
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
  activeItem: Book;
  tableParams: TableParameter[];
}

export const Form = (props: FormProps) => {
  return (
    <form className="form" onSubmit={props.submit}>
      {props.tableParams.map((el, index) => (
        <Input key={index} data={el} value={props.activeItem ? props.activeItem[el.value] : ""} />
      ))}
      <ButtonsList data={props.btnData} />
    </form>
  );
};
