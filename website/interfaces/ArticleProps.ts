import { Image } from "./sanity/Image";
import { Slug } from "./sanity/Slug";

export interface ArticleProps {
  title: string;
  author: string;
  category: string;
  categorySlug: Slug;
  excerpt: string;
  image: Image;
  publishedDate: string;
  slug: Slug;
}
