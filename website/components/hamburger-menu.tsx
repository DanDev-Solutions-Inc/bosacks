import React, { useContext, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
import Image from "next/image";

import { Twitter, LinkedIn, CloseMenuIcon } from "./icons";

import { HamburgerMenuContext } from "../context/hamburger-menu-context";
import { HamburgerMenuProps } from "@interfaces/HamburgerMenuProps";
import useWindowSize from "../hooks/useWindowSize";

const HamburgerMenu = ({ onClose, global }: HamburgerMenuProps) => {
  const { isOpen, toggle } = useContext(HamburgerMenuContext);
  const { windowSize } = useWindowSize();

  useEffect(() => {
    if (windowSize.width >= 640) {
      onClose();
    }
  }, [windowSize.width]);

  return (
    <Menu
      isOpen={isOpen}
      right
      id={"HamburgerMenu"}
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
      onClose={() => onClose()}
      width={"100%"}
    >
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt={"Logo"}
              width={120}
              height={120}
            />
          </Link>
          <button
            className="block sm:hidden"
            onClick={() => {
              if (toggle) {
                toggle();
              }
            }}
          >
            <CloseMenuIcon />
          </button>
        </div>
        <nav className="mt-12">
          <ul className="flex flex-col space-y-6 items-center text-[30px]">
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
            <li className="cursor-pointer flex space-x-4">
              {global && global.twitter && (
                <a href={global.twitter} target="_blank">
                  <Twitter />
                </a>
              )}
              {global && global.linkedIn && (
                <a href={global.linkedIn} target="_blank">
                  <LinkedIn />
                </a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </Menu>
  );
};

export default HamburgerMenu;
