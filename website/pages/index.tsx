import { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";
import { NextSeo } from "next-seo";

import { HomePageProps } from "@interfaces/HomePageProps";
import { Configuration } from "@interfaces/sanity/Configuration";
import { HomePage } from "@interfaces/sanity/HomePage";
import { client } from "@/client";

const Home: NextPage<HomePageProps> = ({
  page,
  configuration,
}: HomePageProps) => {
  console.log(page, configuration);
  useMemo(() => {}, []);

  return (
    <>
      <NextSeo title={page.title} description="" />
      <h1 className="text-3xl font-bold underline">Bosacks.com</h1>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page: HomePage = await client.fetch(`*[_type == "homePage"][0]`);
  const configuration: Configuration = await client.fetch(
    `*[_type == "configuration"][0]`
  );

  return {
    props: { page, configuration },
  };
};

export default Home;
