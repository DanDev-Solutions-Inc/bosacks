import { CategoryPillProps } from "@interfaces/CategoryPillProps";

const CategoryPill = ({ category }: CategoryPillProps) => {
  return (
    <div className="absolute px-2 py-1 bg-primary font-medium text-white text-[10px] rounded-[4px] top-4 left-4">
      <p>{category}</p>
    </div>
  );
};

export default CategoryPill;
