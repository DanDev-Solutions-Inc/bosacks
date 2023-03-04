export const getArticlesQuery = (order: string, start: number, end: number) => `
*[_type == "article"]{
  title,
  slug,
  publishedDate,
  excerpt,
  body,
  image,
  "category": category->title,
} | order(${order})[${start}...${end}]
`;

export const getItemQuery = (name: string) => `*[_type == "${name}"][0]`;
export const getItemsQuery = (name: string) => `*[_type == "${name}"][0]`;
export const getCountQuery = (name: string) => `count(*[_type == "${name}"])`;
