import { createContext, useState } from "react";

import { ModalContextType } from "../types/ModalContextType";

export const SubscribeModalContext = createContext<Partial<ModalContextType>>(
  {}
);

const SubscribeModalContextProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SubscribeModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SubscribeModalContext.Provider>
  );
};

export default SubscribeModalContextProvider;
