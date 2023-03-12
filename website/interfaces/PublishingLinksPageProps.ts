import { Global } from "./sanity/Global";
import { PublishingLink } from "./sanity/PublishingLink";

export interface PublishingLinksPageProps {
  configuration: Global;
  publishingLinks: PublishingLink[];
}
