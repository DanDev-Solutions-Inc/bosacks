import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";

import { HomePageProps } from "@interfaces/HomePageProps";
import { client } from "@client";
import { Article } from "@interfaces/sanity/Article";
import ArticleItem from "@components/article-item";
import { getArticlesQuery } from "@utils/groq-helper";
import { publishedDateDesc } from "@utils/constants";

const FeaturedArticle = dynamic(() => import("@components/featured-article"));

const Home: NextPage<HomePageProps> = ({ articles }: HomePageProps) => {
  return (
    <>
      <NextSeo
        title={`Home | BoSacks`}
        description="A veteran of the printing/publishing industry, BoSacks has always been an innovator who regularly electrifies the media."
      />
      <FeaturedArticle article={articles[0]} />
      <div className="container mt-10">
        <div className="grid md:grid-cols-2 gap-6">
          {articles &&
            articles.slice(1).map((article, index) => {
              return <ArticleItem key={index} article={article} />;
            })}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const articles: Article[] = await client.fetch(
    getArticlesQuery(publishedDateDesc, 0, 12)
  );

  return {
    props: { articles },
  };
};

export default Home;
