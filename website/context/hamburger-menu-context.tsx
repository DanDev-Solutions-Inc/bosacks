import { createContext, useState } from "react";
import { HamburgerMenuContextType } from "../types/HamburgerMenuContextType";

export const HamburgerMenuContext = createContext<
  Partial<HamburgerMenuContextType>
>({});

const HamburgerMenuContextProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HamburgerMenuContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </HamburgerMenuContext.Provider>
  );
};

export default HamburgerMenuContextProvider;
