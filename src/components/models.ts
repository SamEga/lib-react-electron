export interface Book {
  [key: string]: any;
  publishing: string;
  'book-title': string;
  genre: string;
  'book-year': string;
  id?: number;
}

export type btnProp = {
  type: 'button' | 'submit' | 'reset';
  title: string;
  className: string;
  cb?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export interface State {
  activeItem: Book;
  activeItemIndex: number | null;
  books: Book[];
}
