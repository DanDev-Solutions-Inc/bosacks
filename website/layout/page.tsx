import dynamic from "next/dynamic";

import { LayoutProps } from "@interfaces/LayoutProps";

const Navbar = dynamic(() => import("@components/navbar"));
const Footer = dynamic(() => import("@components/footer"));

const Page = ({ children }: LayoutProps) => {
  return (
    <div id="outer-container">
      <Navbar />
      <main id="page-wrap">{children}</main>
      <Footer />
    </div>
  );
};

export default Page;
