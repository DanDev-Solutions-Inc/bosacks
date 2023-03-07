import Image from "next/image";
import Link from "next/link";

import { Twitter, LinkedIn } from "./icons";

const Navbar = () => {
  return (
    <header className="container flex justify-between items-center py-4">
      <Link href="/">
        <Image src="/assets/logo.png" alt={"Logo"} width={120} height={120} />
      </Link>
      <a></a>
      <nav className="hidden sm:block">
        <ul className="flex space-x-4 items-center text-[14px]">
          <li>
            <Link
              href="/#articles"
              className="hover:text-primary font-normal no-underline"
            >
              Articles
            </Link>
          </li>
          <li>
            <Link
              href="/biography"
              className="hover:text-primary font-normal no-underline"
            >
              Biography
            </Link>
          </li>
          <li>|</li>
          <li className="cursor-pointer">
            <Twitter />
          </li>
          <li className="cursor-pointer">
            <LinkedIn />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
