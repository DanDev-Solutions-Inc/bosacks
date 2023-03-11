import { ButtonProps } from "../interfaces/ButtonProps";

const SubscribeButton = ({
  isSubmit,
  text,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className="bg-primary border-2 border-primary text-white text-[16px] font-medium py-2 px-4 lg:py-4 lg:px-12 rounded-[4px] w-full hover:bg-white hover:text-primary transition-all"
      type={isSubmit ? "submit" : "button"}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      disabled={disabled}
    >
      <>
        <div>{text}</div>
      </>
    </button>
  );
};

export default SubscribeButton;
