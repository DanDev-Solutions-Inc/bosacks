import { FiltersProps } from "@interfaces/FiltersProps";

const Filters = ({
  onSearch,
  setSearch,
  setListingOrder,
  search,
}: FiltersProps) => {
  return (
    <div className="container md:flex md:space-x-5 mb-20">
      <div className="flex flex-col mb-8 md:mb-0">
        <label className="text-[12px] uppercase font-bold mb-2">Search</label>
        <input
          className="border border-black text-[14px] h-[25px] outline-none px-1 w-full md:w-[200px]"
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
        <label className="text-[12px] uppercase font-bold mb-2">Sort By</label>
        <div className="flex space-x-5">
          <select
            onChange={(e) => setListingOrder(e.target.value)}
            className="border border-black text-[14x] h-[25px] outline-none px-1 w-[50%] md:w-[200px]"
          >
            <option value="publishedDate desc">{`Published Date (Desc)`}</option>
            <option value="publishedDate asc">{`Published Date (Asc)`}</option>
          </select>
          <select
            onChange={(e) => setListingOrder(e.target.value)}
            className="border border-black text-[14x] h-[25px] outline-none px-1 w-[50%] md:w-[200px]"
          >
            <option>Category...</option>
          </select>
        </div>
      </div>
    </div>
    // <div>
    //   <div>
    //     <label className="font-bold">Search:</label>
    // <input
    //   onKeyDown={(e) => {
    //     if (e.key == "Enter" && e.shiftKey == false) {
    //       onSearch();
    //     }
    //   }}
    //   onChange={(e) => setSearch(e.target.value)}
    //   value={search}
    // />
    //   </div>
    //   <div>
    //     <p className="font-bold">Sort By:</p>
    // <select onChange={(e) => setListingOrder(e.target.value)}>
    //   <option value="publishedDate desc">{`Published Date (Desc)`}</option>
    //   <option value="publishedDate asc">{`Published Date (Asc)`}</option>
    // </select>
    //   </div>
    // </div>
  );
};

export default Filters;
