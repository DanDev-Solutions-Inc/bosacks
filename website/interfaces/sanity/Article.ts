import { Block } from "./Block";
import { Slug } from "./Slug";

export interface Article {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  title: string;
  slug: Slug;
  body: Block[];
  category: string;
  publishedDate: string;
}
