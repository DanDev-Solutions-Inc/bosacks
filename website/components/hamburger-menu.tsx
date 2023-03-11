import React, { useContext, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import { Twitter, LinkedIn, CloseMenuIcon } from "./icons";

import { HamburgerMenuContext } from "../context/hamburger-menu-context";
import { HamburgerMenuProps } from "@interfaces/HamburgerMenuProps";
import useWindowSize from "../hooks/useWindowSize";
import { useRouter } from "next/router";

const Button = dynamic(() => import("@components/button"));

const HamburgerMenu = ({ onClose, global }: HamburgerMenuProps) => {
  const { isOpen, toggle } = useContext(HamburgerMenuContext);
  const { windowSize } = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    if (windowSize.width >= 640) {
      onClose();
    }
  }, [windowSize.width]);

  const onNavigate = (url: string) => {
    toggle?.();
    router.push(url);
  };

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
              <div
                onClick={() => onNavigate("/")}
                className="hover:text-primary font-normal no-underline"
              >
                Home
              </div>
            </li>
            <li>
              <div
                onClick={() => onNavigate("/#articles")}
                className="hover:text-primary font-normal no-underline"
              >
                Articles
              </div>
            </li>
            <li>
              <div
                onClick={() => onNavigate("/biography")}
                className="hover:text-primary font-normal no-underline"
              >
                Biography
              </div>
            </li>
            <li>
              <Button
                text="Subscribe"
                onClick={() => {
                  window.open(global.subscribeLink, "_blank");
                }}
              />
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
