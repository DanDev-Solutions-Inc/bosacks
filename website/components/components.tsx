import Image from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";
import { urlFor } from "@utils/image-helper";

export const components = {
  marks: {
    link: ({ value, children }: any) => {
      return (
        <a href={value?.href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    },
    html: ({ value, children }: any) => {
      return (
        <a href={value?.href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: any) => {
      const { width, height } = getImageDimensions(value);
      return (
        <Image
          src={urlFor(value).width(800).fit("max").auto("format").url()}
          alt={value.alt || " "}
          loading="lazy"
          style={{
            aspectRatio: width / height,
          }}
        />
      );
    },
  },
};
