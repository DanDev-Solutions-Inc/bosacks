import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";
import { NextSeo } from "next-seo";
import Image from "next/image";

import { HomePageProps } from "@interfaces/HomePageProps";
import { Configuration } from "@interfaces/sanity/Configuration";
import { HomePage } from "@interfaces/sanity/HomePage";
import { client } from "@client";
import { Article } from "@interfaces/sanity/Article";
import { urlFor } from "@utils/image-helper";

const Profile = dynamic(() => import("@components/profile"));

const Home: NextPage<HomePageProps> = ({
  page,
  configuration,
  articles,
}: HomePageProps) => {
  console.log(articles);
  useMemo(() => {}, []);

  return (
    <>
      <NextSeo
        title={page.title}
        description="A veteran of the printing/publishing industry, BoSacks has always been an innovator who regularly electrifies the media."
      />
      <h1 className="text-3xl font-bold underline">Bosacks.com</h1>
      <div>
        {page.heroImage && (
          <Image
            src={urlFor(page.heroImage).url()}
            alt={page.heroImage.alt}
            width={500}
            height={500}
          />
        )}
      </div>
      <Profile configuration={configuration} />
      <div>
        {articles &&
          articles.map((a) => {
            return <span key={a._id}>{a.title}</span>;
          })}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const page: HomePage = await client.fetch(`*[_type == "homePage"][0]`);
  const configuration: Configuration = await client.fetch(
    `*[_type == "configuration"][0]`
  );
  const articles: Article[] = await client.fetch(`*[_type == "article"]`);

  return {
    props: { page, configuration, articles },
  };
};

export default Home;
