import { Slug } from "./Slug";

export interface Category {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  slug: Slug;
  title: string;
}
