import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { client } from "@client";
import { getItemQuery, getItemsQuery } from "@utils/groq-helper";
import { PortableText } from "@portabletext/react";
import { components } from "@components/components";
import { PublishingLink } from "@interfaces/sanity/PublishingLink";
import { PublishingLinksPageProps } from "@interfaces/PublishingLinksPageProps";

const PublishingLink = ({
  configuration,
  publishingLinks,
}: PublishingLinksPageProps) => {
  return (
    <>
      <NextSeo
        title={`Publishing Links | BoSacks`}
        description="A veteran of the printing/publishing industry, BoSacks has always been an innovator who regularly electrifies the media."
      />
      <section className="container flex justify-center text-center align-center mt-20 publishing min-h-[500px]">
        <div>
          <div className="mb-5">
            <PortableText
              value={configuration.publishingLinksDescription}
              components={components}
            />
          </div>
          {publishingLinks &&
            publishingLinks.map((publishingLink) => {
              return (
                <div key={publishingLink._id} className="mb-5">
                  <a
                    href={publishingLink.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {publishingLink.title}
                  </a>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default PublishingLink;

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const configuration: Global = await client.fetch(getItemQuery("global"));
  const publishingLinks: PublishingLink[] = await client.fetch(
    getItemsQuery("publishingLink")
  );
  return {
    props: { configuration, publishingLinks },
  };
};
