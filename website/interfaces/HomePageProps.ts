import { Article } from "./sanity/Article";
import { Configuration } from "./sanity/Configuration";
import { HomePage } from "./sanity/HomePage";

export interface HomePageProps {
  page: HomePage;
  configuration: Configuration;
  articles: Article[];
}
