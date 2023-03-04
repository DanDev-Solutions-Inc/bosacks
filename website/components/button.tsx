import { ButtonProps } from "../interfaces/ButtonProps";

const Button = ({ isSubmit, text, onClick, disabled }: ButtonProps) => {
  return (
    <button
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
