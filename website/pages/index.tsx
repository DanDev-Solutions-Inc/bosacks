import { useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import InfiniteScroll from "react-infinite-scroll-component";

import { HomePageProps } from "@interfaces/HomePageProps";
import { Global } from "@interfaces/sanity/Global";
import { HomePage } from "@interfaces/sanity/HomePage";
import { client } from "@client";
import { Article } from "@interfaces/sanity/Article";
import { SubscribeModalContext } from "@context/subscribe-modal-context";
import ArticleItem from "@components/article-item";
import {
  getArticlesQuery,
  getCountQuery,
  getItemQuery,
} from "@utils/groq-helper";
import { publishedDateDesc, itemsPerPage } from "@utils/constants";
import { Mail } from "@components/icons";

const Profile = dynamic(() => import("@components/profile"));
const Button = dynamic(() => import("@components/button"));
const ScrollMessage = dynamic(() => import("@components/scroll-message"));
const FeaturedArticle = dynamic(() => import("@components/featured-article"));
const Filters = dynamic(() => import("@components/filters"));

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
  const [listingOrder, setListingOrder] = useState(publishedDateDesc);
  const [search, setSearch] = useState<string>("");

  useMemo(() => {
    setDataLength(
      filteredArticles.length < itemsPerPage
        ? itemsPerPage
        : filteredArticles.length
    );
  }, [filteredArticles]);

  useMemo(() => {
    const init = async () => {
      const articles: Article[] = await client.fetch(
        getArticlesQuery(listingOrder, 0, itemsPerPage)
      );
      setFilteredArticles(articles);
      setPageCount(1);
      setHasMore(articles.length !== totalArticles);
    };
    init();
  }, [listingOrder]);

  const getFilteredArticles = () => {
    return filteredArticles;
  };

  const onFetchMoreData = async () => {
    const start = itemsPerPage * pageCount;
    const end = start + itemsPerPage;
    const newArticleItems: Article[] = await client.fetch(
      getArticlesQuery(listingOrder, start, end, search)
    );

    setPageCount(pageCount + 1);
    const updatedArticleItems = filteredArticles.concat(newArticleItems);
    setFilteredArticles(updatedArticleItems);
    setHasMore(updatedArticleItems.length !== totalArticles);
  };

  const onSearch = async () => {
    if (!search) {
      setFilteredArticles(filteredArticles);
      setPageCount(1);
      setHasMore(filteredArticles.length !== totalArticles);
    }

    const articles: Article[] = await client.fetch(
      getArticlesQuery(listingOrder, 0, itemsPerPage, search)
    );

    setFilteredArticles(articles);
    setPageCount(1);
    setHasMore(
      articles.length !== (await client.fetch(getCountQuery("article", search)))
    );
  };

  return (
    <>
      <NextSeo
        title={page.title}
        description="A veteran of the printing/publishing industry, BoSacks has always been an innovator who regularly electrifies the media."
      />
      <FeaturedArticle article={articles[0]} />
      <Filters
        search={search}
        onSearch={onSearch}
        setSearch={setSearch}
        setListingOrder={setListingOrder}
      />
      <InfiniteScroll
        dataLength={dataLength}
        next={() => onFetchMoreData()}
        hasMore={hasMore}
        scrollThreshold={0.25}
        loader={<ScrollMessage type="loading" message="Loading..." />}
        endMessage={<ScrollMessage type="end" message="You've seen it all!" />}
        className="container"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {getFilteredArticles() &&
            getFilteredArticles().map((article, index) => {
              return <ArticleItem key={index} article={article} />;
            })}
        </div>
      </InfiniteScroll>
      <button
        className="w-[100px] flex justify-center items-center py-2 space-x-2 text-[12px] fixed bottom-4 right-4 bg-primary text-white rounded-[4px]"
        onClick={() => setIsOpen?.(!isOpen)}
      >
        <Mail />
        <span>Subscribe</span>
      </button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const page: HomePage = await client.fetch(getItemQuery("homePage"));
  const configuration: Global = await client.fetch(getItemQuery("global"));

  const totalArticles = await client.fetch(getCountQuery("article"));
  const articles: Article[] = await client.fetch(
    getArticlesQuery(publishedDateDesc, 0, itemsPerPage)
  );

  return {
    props: { page, configuration, articles, totalArticles },
  };
};

export default Home;
