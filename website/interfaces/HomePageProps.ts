import { Article } from "./sanity/Article";
import { Category } from "./sanity/Category";
import { HomePage } from "./sanity/HomePage";

export interface HomePageProps {
  page: HomePage;
  articles: Article[];
  categories: Category[];
  totalArticles: number;
}
