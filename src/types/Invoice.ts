import { Item } from "./Item";
import { Person } from "./Person";

export type Invoice = {
  invoiceId: string;
  invNum: number;
  date: number;
  dueDate: number;
  to: Person;
  from: Person;
  items: Item[];
  currency: string;
  taxRate: number;
  discountRate: number;
  createdAt: number;
  updatedAt: number;
  notes: string;
};
