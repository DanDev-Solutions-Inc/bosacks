import { useContext, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

import { HomePageProps } from "@interfaces/HomePageProps";
import { Global } from "@interfaces/sanity/Global";
import { HomePage } from "@interfaces/sanity/HomePage";
import { client } from "@client";
import { Article } from "@interfaces/sanity/Article";
import { urlFor } from "@utils/image-helper";
import { SubscribeModalContext } from "@context/subscribe-modal-context";
import ArticleItem from "@components/article-item";
import {
  getArticlesQuery,
  getCountQuery,
  getItemQuery,
} from "@utils/groq-helper";

const Profile = dynamic(() => import("@components/profile"));
const Button = dynamic(() => import("@components/button"));
const ScrollMessage = dynamic(() => import("@components/scroll-message"));

const Home: NextPage<HomePageProps> = ({
  page,
  configuration,
  articles,
  totalArticles,
}: HomePageProps) => {
  const { isOpen, setIsOpen } = useContext(SubscribeModalContext);
  const [hasMore, setHasMore] = useState(articles.length !== totalArticles);
  const [pageCount, setPageCount] = useState(1);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  const [dataLength, setDataLength] = useState(articles.length);
  const [order, setOrder] = useState("publishedDate desc");

  //filters
  const [search, setSearch] = useState<string>("");

  const itemsPerPage = 2;

  useMemo(() => {
    setDataLength(filteredArticles.length);
  }, [filteredArticles]);

  useEffect(() => {
    if (getFilteredArticles.length < itemsPerPage) {
      setDataLength(itemsPerPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFilteredArticles = () => {
    if (!search) {
      return filteredArticles;
    }
    return filteredArticles.filter((a) => a.title.includes(search));
  };

  const onFetchMoreData = async () => {
    const start = itemsPerPage * pageCount;
    const end = start + itemsPerPage;
    const newArticleItems: Article[] = await client.fetch(
      getMoreArticlesQuery(order, start, end)
    );

    setPageCount(pageCount + 1);
    const updatedArticleItems = filteredArticles.concat(newArticleItems);
    setFilteredArticles(updatedArticleItems);
    setHasMore(updatedArticleItems.length !== totalArticles);
  };

  return (
    <>
      <NextSeo
        title={page.title}
        description="A veteran of the printing/publishing industry, BoSacks has always been an innovator who regularly electrifies the media."
      />
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
        <input onChange={(e) => setSearch(e.target.value)} value={search} />
      </div>
      <InfiniteScroll
        dataLength={dataLength}
        next={() => onFetchMoreData()}
        hasMore={hasMore}
        scrollThreshold={0.25}
        loader={<ScrollMessage type="loading" message="Loading" />}
        endMessage={<ScrollMessage type="end" message="You've seen it all" />}
      >
        <div>
          {getFilteredArticles() &&
            getFilteredArticles().map((article, index) => {
              return <ArticleItem key={index} article={article} />;
            })}
        </div>
      </InfiniteScroll>
      <Button text={"Subscribe"} onClick={() => setIsOpen?.(!isOpen)} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const page: HomePage = await client.fetch(getItemQuery("homePage"));
  const configuration: Global = await client.fetch(getItemQuery("global"));

  const itemsPerPage = 2;
  const order = "publishedDate desc";

  const totalArticles = await client.fetch(getCountQuery("article"));

  const articles: Article[] = await client.fetch(
    getArticlesQuery(order, 0, itemsPerPage)
  );

  return {
    props: { page, configuration, articles, totalArticles },
  };
};

export default Home;
