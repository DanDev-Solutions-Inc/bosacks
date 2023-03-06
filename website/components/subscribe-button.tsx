import { Mail } from "@components/icons";
import { SubscribeButtonProps } from "@interfaces/SubscribeButtonProps";

const SubscribeButton = ({ isOpen, setIsOpen }: SubscribeButtonProps) => {
  return (
    <button
      className="w-[100px] flex justify-center items-center py-2 space-x-2 text-[12px] fixed bottom-4 right-4 bg-primary text-white rounded-[4px]"
      onClick={() => setIsOpen?.(!isOpen)}
    >
      <Mail />
      <span>Subscribe</span>
    </button>
  );
};

export default SubscribeButton;
