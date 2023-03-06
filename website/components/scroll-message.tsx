import { ScrollMessageProps } from "../interfaces/ScrollMessageProps";

const ScrollMessage = ({ message, type }: ScrollMessageProps) => {
  return (
    <div className="container overflow-hidden">
      <div
        className={`${
          type === "end"
            ? `cursor-pointer bg-primary text-white rounded-[4px] max-w-[150px] mx-auto p-2 text-center my-10 text-[14px]`
            : `text-center my-10 text-[14px]`
        }`}
        onClick={() => {
          if (type === "loading") return;
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ScrollMessage;
