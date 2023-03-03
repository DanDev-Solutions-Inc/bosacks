import { LayoutProps } from "../interfaces/LayoutProps";

const Page = ({ children }: LayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default Page;
