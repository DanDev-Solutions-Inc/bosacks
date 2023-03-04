import { ScrollMessageProps } from "../interfaces/ScrollMessageProps";

const ScrollMessage = ({ message, type }: ScrollMessageProps) => {
  return (
    <div>
      <div
        className={`${type === "end" ? `cursor-pointer` : ``}`}
        style={{
          border: "2px solid rgba(127, 133, 150, 0.3)",
        }}
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
