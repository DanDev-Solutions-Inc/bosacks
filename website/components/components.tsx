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
      let width = 250;
      let height = 250;
      let url = "";

      try {
        const imageDimensions = getImageDimensions(value);
        width = imageDimensions.width;
        height = imageDimensions.height;
        url = urlFor(value).width(800).fit("max").auto("format").url();
      } catch (e) {
        console.error((e as Error).message);
      }

      return (
        <Image
          src={url}
          width={width}
          height={height}
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
