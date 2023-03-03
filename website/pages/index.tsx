import { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";
import { NextSeo } from "next-seo";

import { HomePageProps } from "@interfaces/HomePageProps";
import { Configuration } from "@interfaces/sanity/Configuration";
import { HomePage } from "@interfaces/sanity/HomePage";
import { client } from "@/client";
import { Article } from "@/interfaces/sanity/Article";

const Home: NextPage<HomePageProps> = ({
  page,
  configuration,
  articles,
}: HomePageProps) => {
  console.log(articles);
  useMemo(() => {}, []);

  return (
    <>
      <NextSeo title={page.title} description="" />
      <h1 className="text-3xl font-bold underline">Bosacks.com</h1>
      <div>
        {articles &&
          articles.map((a) => {
            return <span key={a._id}>{a.title}</span>;
          })}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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
