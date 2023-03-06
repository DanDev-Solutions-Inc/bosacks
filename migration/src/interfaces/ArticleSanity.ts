import { Slug } from "./Slug";

export interface ArticleSanity {
  _id: string;
  _type: string;
  title: string;
  slug: Slug;
  publishedDate: string;
  author: any;
  category: any;
  excerpt: string;
  body: any;
}
