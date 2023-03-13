import { Article } from "./sanity/Article";
import { Category } from "./sanity/Category";

export interface ArticlesPageProps {
  articles: Article[];
  categories: Category[];
  totalArticles: number;
}
