import { Block } from "./Block";
import { Image } from "./Image";
import { Slug } from "./Slug";

export interface Article {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  title: string;
  slug: Slug;
  excerpt: string;
  body: Block[];
  category: string;
  publishedDate: string;
  image: Image;
}
