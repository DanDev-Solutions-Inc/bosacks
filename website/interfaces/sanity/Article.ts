import { Block } from "./Block";

export interface Article {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  title: string;
  body: Block[];
}
