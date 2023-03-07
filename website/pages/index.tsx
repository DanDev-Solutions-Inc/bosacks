import { useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import InfiniteScroll from "react-infinite-scroll-component";

import { HomePageProps } from "@interfaces/HomePageProps";
import { HomePage } from "@interfaces/sanity/HomePage";
import { client } from "@client";
import { Article } from "@interfaces/sanity/Article";
import { SubscribeModalContext } from "@context/subscribe-modal-context";
import ArticleItem from "@components/article-item";
import {
  getArticlesQuery,
  getCountQuery,
  getItemQuery,
  getItemsQuery,
} from "@utils/groq-helper";
import { publishedDateDesc, itemsPerPage } from "@utils/constants";
import { Category } from "@interfaces/sanity/Category";

const ScrollMessage = dynamic(() => import("@components/scroll-message"));
const FeaturedArticle = dynamic(() => import("@components/featured-article"));
const Filters = dynamic(() => import("@components/filters"));
const SubscribeButton = dynamic(() => import("@components/subscribe-button"));

const Home: NextPage<HomePageProps> = ({
  page,
  articles,
  categories,
  totalArticles,
}: HomePageProps) => {
  const { isOpen, setIsOpen } = useContext(SubscribeModalContext);
  const [hasMore, setHasMore] = useState(articles.length !== totalArticles);
  const [pageCount, setPageCount] = useState(1);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  const [dataLength, setDataLength] = useState(articles.length);
  const [listingOrder, setListingOrder] = useState(publishedDateDesc);
  const [categoryFilter, setCategoryFilter] = useState("");
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

  useMemo(() => {
    const init = async () => {
      if (!categoryFilter) return;

      const articles: Article[] = await client.fetch(
        getArticlesQuery(listingOrder, 0, itemsPerPage, search, categoryFilter)
      );
      setFilteredArticles(articles);
      setPageCount(1);

      const filteredCount = await client.fetch(
        getCountQuery("article", search, categoryFilter)
      );

      setHasMore(articles.length !== filteredCount);
    };
    init();
  }, [categoryFilter]);

  const getFilteredArticles = () => {
    return filteredArticles;
  };

  const onFetchMoreData = async () => {
    const start = itemsPerPage * pageCount;
    const end = start + itemsPerPage;
    const newArticleItems: Article[] = await client.fetch(
      getArticlesQuery(listingOrder, start, end, search, categoryFilter)
    );

    if (newArticleItems.length > 0) {
      setPageCount(pageCount + 1);
      const updatedArticleItems = filteredArticles.concat(newArticleItems);
      setFilteredArticles(updatedArticleItems);
      setHasMore(updatedArticleItems.length !== totalArticles);
    } else {
      setHasMore(false);
    }
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

  const onClear = async () => {
    setFilteredArticles(articles);
    setHasMore(articles.length !== totalArticles);
    setDataLength(articles.length);
    setPageCount(1);
    setListingOrder(publishedDateDesc);
    setCategoryFilter("");
    setSearch("");
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
        listingOrder={listingOrder}
        setListingOrder={setListingOrder}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
        onClear={onClear}
      />
      <InfiniteScroll
        dataLength={dataLength}
        next={() => onFetchMoreData()}
        hasMore={hasMore}
        scrollThreshold={0.25}
        loader={<ScrollMessage type="loading" message="Loading..." />}
        endMessage={<ScrollMessage type="end" message="You've seen it all!" />}
        className="container mt-10"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {getFilteredArticles() &&
            getFilteredArticles().map((article, index) => {
              return <ArticleItem key={index} article={article} />;
            })}
        </div>
      </InfiniteScroll>
      <SubscribeButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const page: HomePage = await client.fetch(getItemQuery("homePage"));
  const categories: Category[] = await client.fetch(getItemsQuery("category"));
  const totalArticles = await client.fetch(getCountQuery("article"));
  const articles: Article[] = await client.fetch(
    getArticlesQuery(publishedDateDesc, 0, itemsPerPage)
  );

  return {
    props: { page, articles, categories, totalArticles },
  };
};

export default Home;
