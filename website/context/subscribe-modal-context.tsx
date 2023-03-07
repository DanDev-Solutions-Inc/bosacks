import { createContext, useState } from "react";

import { ModalContextType } from "../types/ModalContextType";

export const SubscribeModalContext = createContext<Partial<ModalContextType>>(
  {}
);

const SubscribeModalContextProvider = ({ children }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SubscribeModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </SubscribeModalContext.Provider>
  );
};

export default SubscribeModalContextProvider;
