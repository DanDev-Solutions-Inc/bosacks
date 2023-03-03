import { Asset } from "./Asset";
import { Crop } from "./Crop";
import { Hotspot } from "./Hotspot";

export interface Image {
  _type: string;
  alt: string;
  asset: Asset;
  crop: Crop;
  hotspot: Hotspot;
}
