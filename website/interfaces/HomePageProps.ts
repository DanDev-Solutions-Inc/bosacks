import { Article } from "./sanity/Article";
import { Category } from "./sanity/Category";

export interface HomePageProps {
  articles: Article[];
  categories: Category[];
  totalArticles: number;
}
