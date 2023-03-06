import { ButtonProps } from "../interfaces/ButtonProps";

const Button = ({ isSubmit, text, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className="bg-primary border-2 border-primary text-white text-[14px] font-normal py-2 px-4 rounded-[4px] w-full hover:bg-white hover:text-primary transition-all"
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

export default Button;
