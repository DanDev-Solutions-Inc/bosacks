import { useContext } from "react";

import { SubscribeModalContext } from "@context/subscribe-modal-context";

const SubscribeModal = () => {
  const { isOpen, setIsOpen } = useContext(SubscribeModalContext);

  const onClose = () => {
    setIsOpen?.(false);
  };

  return (
    <div
      style={{
        display: isOpen ? "" : "none",
      }}
    >
      <>
        <div onClick={() => onClose()}>&#10005;</div>
        {/* <!-- Begin Constant Contact Inline Form Code --> */}
        <div>
          <div
            className="ctct-inline-form"
            data-form-id="88e876ec-d820-4726-bf21-f6eb669a159b"
          ></div>
        </div>
        {/* <!-- End Constant Contact Inline Form Code --> */}
      </>
    </div>
  );
};

export default SubscribeModal;
