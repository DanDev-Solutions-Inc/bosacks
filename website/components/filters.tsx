import dynamic from "next/dynamic";

import { FiltersProps } from "@interfaces/FiltersProps";

const Button = dynamic(() => import("@components/button"));

const Filters = ({
  onSearch,
  setSearch,
  listingOrder,
  setListingOrder,
  search,
  categoryFilter,
  setCategoryFilter,
  categories,
  onClear,
}: FiltersProps) => {
  return (
    <div className="container">
      <div className="hidden md:grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        <label className="text-[12px] uppercase font-bold mb-2">Search</label>
        <label className="text-[12px] uppercase font-bold mb-2">Sort By</label>
        <label className="text-[12px] uppercase font-bold mb-2">
          Filter By
        </label>
      </div>
      <div id="articles">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <label className="text-[12px] uppercase font-bold mb-2 md:hidden">
              Search
            </label>
            <input
              className="border-2 border-black text-[14px] h-[40px] outline-none px-2 pt-[1px] w-[100%] rounded-[4px]"
              onKeyDown={(e) => {
                if (e.key == "Enter" && e.shiftKey == false) {
                  onSearch();
                }
              }}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search..."
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[12px] uppercase font-bold mb-2 md:hidden">
              Sort By
            </label>
            <div className="flex space-x-5">
              <select
                onChange={(e) => setListingOrder(e.target.value)}
                value={listingOrder}
                className="border-2 rounded-[4px] text-grey border-black text-[14x] h-[40px] outline-none px-2 pt-[1px] w-[100%]"
              >
                <option value="publishedDate desc">{`Sort by Published Date (Desc)`}</option>
                <option value="publishedDate asc">{`Sort by Published Date (Asc)`}</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[12px] uppercase font-bold mb-2 md:hidden">
              Filter By
            </label>
            <div className="flex space-x-5">
              <select
                onChange={(e) => setCategoryFilter(e.target.value)}
                value={categoryFilter}
                className="border-2 rounded-[4px] text-grey border-black text-[14x] h-[40px] outline-none px-2 pt-[1px] w-[100%]"
              >
                <option value="">Filter by Category...</option>
                {categories &&
                  categories.map((category) => {
                    return (
                      <option key={category._id} value={category.title}>
                        {category.title}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="sm:h-[26px] md:h-0" />
            <Button text="Clear" onClick={() => onClear()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
