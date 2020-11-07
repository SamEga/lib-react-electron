import React from "react";
import { TableParameter } from "../App/App";
import { Book } from "../models";

interface TableProps {
  data: Book[];
  onSelect: (activeItem: Book, index: number) => void;
  activeItem: Book;
  tableParams: TableParameter[];
}

export const Table = (props: TableProps) => {
  return (
    <main>
      <table className="table table-striped" aria-describedby="books">
        <thead className="thead-dark">
          <tr>
            {props.tableParams.map((params, index) => (
              <th key={index} scope="col">
                {params.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((el, index) => (
            <tr
              key={index}
              onClick={() => props.onSelect(el, index)}
              className={el.id === props.activeItem?.id ? "bg-warning" : ""}
            >
              {props.tableParams.map((params, i) => (
                <td key={i}> {el[params["value"]]} </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
