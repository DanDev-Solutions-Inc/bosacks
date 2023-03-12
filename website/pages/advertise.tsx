import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { client } from "@client";
import { getItemQuery } from "@utils/groq-helper";
import { PortableText } from "@portabletext/react";
import { components } from "@components/components";
import { AdvertisePageProps } from "@interfaces/AdvertisePageProps";

const Advertise = ({ configuration }: AdvertisePageProps) => {
  return (
    <>
      <NextSeo
        title={`Advertise | BoSacks`}
        description="A veteran of the printing/publishing industry, BoSacks has always been an innovator who regularly electrifies the media."
      />
      <section className="container mt-40 advertise min-h-[80vh]">
        <div>
          <PortableText
            value={configuration.advertiseDescription}
            components={components}
          />
        </div>
      </section>
    </>
  );
};

export default Advertise;

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const configuration: Global = await client.fetch(getItemQuery("global"));
  return {
    props: { configuration },
  };
};
