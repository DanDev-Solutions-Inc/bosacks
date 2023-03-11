import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useContext, useMemo, useState } from "react";

import HamburgerMenu from "./hamburger-menu";

import { HamburgerMenuContext } from "../context/hamburger-menu-context";
import { Twitter, LinkedIn, HamburgerMenuIcon } from "./icons";
import { client } from "@client";
import { getItemQuery } from "@utils/groq-helper";
import { Global } from "@interfaces/sanity/Global";

const SubscribeButton = dynamic(() => import("@components/subscribe-button"));

const Navbar = () => {
  const { setIsOpen, toggle } = useContext(HamburgerMenuContext);
  const [global, setGlobal] = useState<Global>();

  useMemo(() => {
    const init = async () => {
      const global: Global = await client.fetch(getItemQuery("global"));
      setGlobal(global);
    };
    init();
  }, []);

  return (
    <>
      <header className="container py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="relative w-[220px] h-[100px] md:w-[280px] md:h-[120px]"
          >
            <Image
              src="/assets/logo.png"
              alt={"Logo"}
              fill
              className="object-fit"
              sizes="100%"
            />
          </Link>
          <nav className="hidden sm:block">
            <ul className="flex space-x-4 items-center text-[14px] md:text-[16px]">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary font-normal no-underline"
                >
                  Home
                </Link>
              </li>
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
              <li className="cursor-pointer">
                {global && global.twitter && (
                  <a href={global.twitter} target="_blank">
                    <Twitter size="lg" />
                  </a>
                )}
              </li>
              <li className="cursor-pointer">
                {global && global.linkedIn && (
                  <a href={global.linkedIn} target="_blank">
                    <LinkedIn size="lg" />
                  </a>
                )}
              </li>
              <li>
                <SubscribeButton
                  text="Subscribe"
                  onClick={() => window.open(global?.subscribeLink, "_blank")}
                />
              </li>
            </ul>
          </nav>
          <button
            className="block sm:hidden"
            onClick={() => {
              if (toggle) {
                toggle();
              }
            }}
          >
            <HamburgerMenuIcon />
          </button>
        </div>
      </header>
      <HamburgerMenu
        global={global as Global}
        onClose={() => {
          if (setIsOpen) {
            setIsOpen(false);
          }
        }}
      />
    </>
  );
};

export default Navbar;
