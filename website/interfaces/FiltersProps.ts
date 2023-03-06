import { Category } from "./sanity/Category";

export interface FiltersProps {
  search: string;
  onSearch: Function;
  setSearch: Function;
  setListingOrder: Function;
  setCategoryFilter: Function;
  categories: Category[];
}
