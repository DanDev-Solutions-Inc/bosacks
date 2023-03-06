import { Slug } from "./Slug";

export interface Category {
  _id: string;
  _type: string;
  title: string;
  slug: Slug;
}
