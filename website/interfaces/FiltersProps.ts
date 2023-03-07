import { Category } from "./sanity/Category";

export interface FiltersProps {
  search: string;
  onSearch: Function;
  setSearch: Function;
  listingOrder: string;
  setListingOrder: Function;
  categoryFilter: string;
  setCategoryFilter: Function;
  categories: Category[];
  onClear: Function;
}
