import imageUrlBuilder from "@sanity/image-url";

import { client } from "@/client";
// import { Image } from "@/interfaces/sanity/image";

const builder = imageUrlBuilder(client);

// export const urlFor = (source: Image) => {
//   return builder.image(source);
// };
