import dynamic from "next/dynamic";
import { LayoutProps } from "../interfaces/LayoutProps";

const Footer = dynamic(() => import("@components/footer"));

const Page = ({ children }: LayoutProps) => {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Page;
