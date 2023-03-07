import React, { useMemo, useState } from "react";

import { PortableText } from "@portabletext/react";
import { components } from "./components";
import { client } from "@client";
import { getItemQuery } from "@utils/groq-helper";
import { Global } from "@interfaces/sanity/Global";

const Footer = () => {
  const [global, setGlobal] = useState<Global>();

  useMemo(() => {
    const init = async () => {
      const global: Global = await client.fetch(getItemQuery("global"));
      setGlobal(global);
    };
    init();
  }, []);

  return (
    <div className="bg-primary text-white text-center mt-20">
      {global && (
        <PortableText
          value={global.footerDescription}
          components={components}
        />
      )}
    </div>
  );
};

export default Footer;
