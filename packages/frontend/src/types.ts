export type Column = {
  id: Id;
  title: string;
};

export type Id = string | number;

export type Note = {
  id: Id;
  columnId: Id;
  content: string;
};
