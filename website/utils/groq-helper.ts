export const getArticlesQuery = (
  order: string,
  start: number,
  end: number,
  search?: string,
  category?: string
) => `
*[_type == "article" ${search ? `&& title match "*${search}*"` : ""} ${
  category ? `&& category->title == "${category}"` : ""
}]{
  title,
  slug,
  publishedDate,
  excerpt,
  image,
  "category": category->title,
  "author": author->title,
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
    "author": author->title,
    "categorySlug": category->slug,}
`;

export const getItemQuery = (name: string) => `*[_type == "${name}"][0]`;

export const getItemsQuery = (name: string) => `*[_type == "${name}"]`;

export const getCountQuery = (
  name: string,
  search?: string,
  category?: string
) =>
  `count(*[_type == "${name}" ${search ? `&& title match "*${search}*"` : ""} ${
    category ? `&& category->title == "${category}"` : ""
  }])`;
