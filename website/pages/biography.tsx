import { GetServerSideProps } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { urlFor } from "@utils/image-helper";
import { client } from "@client";
import { BiographyPageProps } from "@interfaces/BiographyPageProps";
import { getItemQuery } from "@utils/groq-helper";
import { LinkedIn, Twitter } from "@components/icons";
import { NextSeo } from "next-seo";
import { PortableText } from "@portabletext/react";
import { components } from "@components/components";
import useTimeout from "../hooks/useTimeout";
import { useState } from "react";

const Button = dynamic(() => import("@components/button"));

const Biography = ({ configuration }: BiographyPageProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useTimeout(() => setLoading(false), 0);

  if (loading) return <div className="h-[100vh]" />;

  return (
    <>
      <NextSeo
        title={`Biography | BoSacks`}
        description="A veteran of the printing/publishing industry, BoSacks has always been an innovator who regularly electrifies the media."
      />
      <section className="container mt-40">
        <div className="">
          <Image
            src={urlFor(configuration.avatarImage).url()}
            alt={configuration.title}
            width={180}
            height={180}
            priority
            className="rounded-full mx-auto mb-8"
          />
          <p className="text-[16px] text-[#333]">
            <PortableText value={configuration.bio} components={components} />
          </p>
          <ul className="flex justify-center mt-10 space-x-4">
            <li>
              <a href={configuration.twitter}>
                <Twitter size="lg" />
              </a>
            </li>
            <li>
              <a href={configuration.linkedIn}>
                <LinkedIn size="lg" />
              </a>
            </li>
          </ul>
          <div className="max-w-[150px] mx-auto mt-8">
            <Button
              text="Browse Articles"
              onClick={() => router.push("/#articles")}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Biography;

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const configuration: Global = await client.fetch(getItemQuery("global"));
  return {
    props: { configuration },
  };
};
