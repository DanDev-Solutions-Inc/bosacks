import React, { useMemo, useState } from "react";
import { PortableText } from "@portabletext/react";

import { components } from "./components";
import { client } from "@client";
import { getItemQuery } from "@utils/groq-helper";
import { Global } from "@interfaces/sanity/Global";
import Link from "next/link";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const [global, setGlobal] = useState<Global>();

  useMemo(() => {
    const init = async () => {
      const global: Global = await client.fetch(getItemQuery("global"));
      setGlobal(global);
    };
    init();
  }, []);

  return (
    <div className="bg-primary text-white mt-20 py-10">
      <div className="container grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="font-bold mb-3">BoSacks Newsletter - Since 1993</h3>
          <div className="text-[12px]">
            {global && (
              <PortableText
                value={global.footerDescription}
                components={components}
              />
            )}
            <button
              className="mt-5 underline"
              onClick={() => window.open(global?.subscribeLink, "_blank")}
            >
              Subscribe for Free
            </button>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-3">BoSacks Speaks Out</h3>
          <ul>
            <li>
              <Link href="/articles" className="text-[12px] hover:underline">
                Browse Articles
              </Link>
            </li>
            <li>
              <Link href="/biography" className="text-[12px] hover:underline">
                Read Biography
              </Link>
            </li>
            <li>
              <Link href="/advertise" className="text-[12px] hover:underline">
                Advertise
              </Link>
            </li>
            <li>
              <Link
                href="/publishing-links"
                className="text-[12px] hover:underline"
              >
                Links
              </Link>
            </li>
            <li>
              <Link
                href="mailto:bo@bosacks.com"
                target="_blank"
                className="text-[12px] hover:underline"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center text-[10px] mt-10">
        Copyright ©{" "}
        <Link href="/" className="hover:underline">
          BoSacks
        </Link>{" "}
        {year}
      </p>
    </div>
  );
};

export default Footer;
