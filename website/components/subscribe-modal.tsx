import { useContext } from "react";

import { SubscribeModalContext } from "@context/subscribe-modal-context";

const SubscribeModal = () => {
  const { isModalOpen, setIsModalOpen } = useContext(SubscribeModalContext);

  const onClose = () => {
    setIsModalOpen?.(false);
  };

  return (
    <div
      className={`${
        isModalOpen ? `fixed top-0` : `hidden`
      } bg-white w-full h-screen bg-opacity-50 backdrop-blur-sm flex items-center justify-center px-[25px]`}
    >
      <div className="bg-white w-[500px] border">
        <div onClick={() => onClose()} className="p-4 cursor-pointer">
          &#10005;
        </div>
        {/* <!-- Begin Constant Contact Inline Form Code --> */}
        <div
          className="ctct-inline-form"
          data-form-id="88e876ec-d820-4726-bf21-f6eb669a159b"
        ></div>
        {/* <!-- End Constant Contact Inline Form Code --> */}
      </div>
    </div>
  );
};

export default SubscribeModal;
