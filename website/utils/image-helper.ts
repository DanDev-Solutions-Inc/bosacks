import imageUrlBuilder from "@sanity/image-url";

import { Image } from "@interfaces/sanity/Image";
import { client } from "@client";

const builder = imageUrlBuilder(client);

export const urlFor = (source: Image) => {
  return builder.image(source);
};
