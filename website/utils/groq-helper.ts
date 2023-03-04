import { Slug } from "@interfaces/sanity/Slug";

export const getArticlesQuery = (
  order: string,
  start: number,
  end: number,
  search?: string
) => `
*[_type == "article" ${search ? `&& title match "*${search}*"` : ""}]{
  title,
  slug,
  publishedDate,
  excerpt,
  image,
  "category": category->title,
  "categorySlug": category->slug,
} | order(${order})[${start}...${end}]
`;

export const getArticleQuery = (slug: string) => `
*[_type == "article" && slug.current == "${slug}"][0]{
    title,
    slug,
    publishedDate,
    body,
    image,
    "category": category->title,
    "categorySlug": category->slug,}
`;

export const getItemQuery = (name: string) => `*[_type == "${name}"][0]`;

export const getItemsQuery = (name: string) => `*[_type == "${name}"][0]`;

export const getCountQuery = (name: string, search?: string) =>
  `count(*[_type == "${name}" ${
    search ? `&& title match "*${search}*"` : ""
  }])`;
