import dynamic from "next/dynamic";
import { LayoutProps } from "../interfaces/LayoutProps";

const Footer = dynamic(() => import("@components/footer"));
const SubscribeModal = dynamic(() => import("@components/subscribe-modal"));

const Page = ({ children }: LayoutProps) => {
  return (
    <div>
      <main>{children}</main>
      <Footer />
      <SubscribeModal />
    </div>
  );
};

export default Page;
