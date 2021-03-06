import React, { Component } from "react";

import { Form } from "../form/form";
import { Table } from "../table/table";
import { Book, btnProp, State } from "../models";
import { StorageService } from "../../services/storage.service";

export interface TableParameter {
  title: string;
  value: string;
  type: "text" | "date";
  cb: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class App extends Component {
  storage = new StorageService(window.localStorage);

  state: State = {
    activeItem: {
      publishing: "",
      "book-title": "",
      genre: "",
      "book-year": "",
    },
    activeItemIndex: null,
    books: [],
  };

  componentDidMount(): void {
    this.getDataFromStorage();
  }

  getDataFromStorage = () => {
    const books = this.storage.getData();
    if (books) {
      this.setState({ books });
    }
  };

  saveDataInStorage = (): void => {
    this.storage.saveData(this.state.books);
  };

  submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputs: HTMLCollectionOf<HTMLInputElement> = (event.target as any).getElementsByTagName("input");
    const obj = this.createNewObj(inputs);
    if (obj) {
      const { books } = this.state;
      books.push(obj as Book);
      this.setState({ books, activeItem: null });
    }
  };

  createNewObj = (inputs: HTMLCollectionOf<HTMLInputElement>) => {
    const obj: Book | { [keys: string]: any } = {};
    for (const input of inputs) {
      if (!input.value) {
        return false;
      }
      obj[input["id"]] = input.value;
    }
    obj.id = Date.now();
    return obj;
  };

  editItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { books } = this.state;
    if (this.state.activeItemIndex !== null) {
      books[this.state.activeItemIndex] = this.state.activeItem;
    }
    this.setState({ books });
  };

  deleteItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { books } = this.state;
    if (this.state.activeItemIndex === null) {
      return;
    }
    books.splice(this.state.activeItemIndex, 1);
    this.setState({ activeItemIndex: null, activeItem: null });
  };

  selectItem = (activeItem: Book, index: number) => {
    const active = Object.assign({}, activeItem);
    this.setState({ activeItem: active, activeItemIndex: index });
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { activeItem } = this.state;
    activeItem[event.target["id"]] = event.target.value;
    this.setState({ activeItem });
  };

  btnParams: Array<btnProp> = [
    { type: "submit", title: "Добавить", className: "btn btn-success", cb: () => {} },
    { type: "button", title: "Сохранить изменения", className: "btn btn-outline-info", cb: this.editItem },
    { type: "button", title: "Удалить", className: "btn btn-outline-danger", cb: this.deleteItem },
    { type: "button", title: "Сохранить данные", className: "btn btn-primary btn-save", cb: this.saveDataInStorage },
  ];

  tableParams: Array<TableParameter> = [
    { type: "text", title: "Издательство", value: "publishing", cb: this.onChange },
    { type: "text", title: "Название книги", value: "book-title", cb: this.onChange },
    { type: "text", title: "Жанр", value: "genre", cb: this.onChange },
    { type: "date", title: "Год", value: "book-year", cb: this.onChange },
  ];

  render() {
    return (
      <>
        <Form
          tableParams={this.tableParams}
          activeItem={this.state.activeItem}
          submit={this.submitForm}
          btnData={this.btnParams}
        />
        <Table
          tableParams={this.tableParams}
          activeItem={this.state.activeItem}
          onSelect={this.selectItem}
          data={this.state.books}
        />
      </>
    );
  }
}
