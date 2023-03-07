import dynamic from "next/dynamic";

import { LayoutProps } from "@interfaces/LayoutProps";

const Navbar = dynamic(() => import("@components/navbar"));
const Footer = dynamic(() => import("@components/footer"));
const SubscribeModal = dynamic(() => import("@components/subscribe-modal"));

const Page = ({ children }: LayoutProps) => {
  return (
    <div id="outer-container">
      <Navbar />
      <main id="page-wrap">{children}</main>
      <Footer />
      <SubscribeModal />
    </div>
  );
};

export default Page;
