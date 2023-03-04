import { Article } from "./sanity/Article";
import { Global } from "./sanity/Global";
import { HomePage } from "./sanity/HomePage";

export interface HomePageProps {
  page: HomePage;
  configuration: Global;
  articles: Article[];
  totalArticles: number;
}
