import { GetServerSideProps } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import { PortableText } from "@portabletext/react";
import { dateHelper } from "@utils/date-helper";

import { client } from "@client";
import { getArticleQuery } from "@utils/groq-helper";
import { urlFor } from "@utils/image-helper";
import { components } from "@components/components";
import { NextSeo } from "next-seo";

const CategoryPill = dynamic(() => import("@components/category-pill"));

const Article = ({ article, fullUrl }: any) => {
  return (
    <>
      {/* <NextSeo title={article.title} description={article.excerpt} /> */}
      <NextSeo
        title={article.title}
        description={article.excerpt}
        openGraph={{
          title: article.title,
          description: article.excerpt,
          url: fullUrl,
          type: "article",
          article: {
            publishedTime: article.publishedDate,
            authors: [article.author],
            tags: article.tags || [],
          },
          images: [
            {
              url: article.image
                ? urlFor(article.image).width(1200).height(630).url()
                : "https://www.bosacks.com/_next/image?url=%2Fassets%2Flogo.png&w=1200&q=75",
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <article className="max-w-[800px] mx-auto px-[25px] my-10">
        <h1 className="text-[22px] md:text-[28px] leading-[100%] font-bold mb-4">
          {article.title}
        </h1>
        <div className="flex space-x-4 mb-4">
          <p className="text-[14px] text-primary">By {article.author}</p>
          <p className="text-[14px] text-primary">
            {dateHelper(article.publishedDate)}
          </p>
        </div>
        <div>
          {article.image ? (
            <div className="relative mb-4">
              <Image
                src={urlFor(article.image).url()}
                alt={article.title}
                width={1024}
                height={350}
                priority
              />
            </div>
          ) : (
            <div className="relative mb-4">
              <CategoryPill category={article.category} />
              <Image
                src="/assets/article-image-placeholder.jpeg"
                alt={article.title}
                width={1024}
                height={350}
                priority
              />
            </div>
          )}
        </div>
        <div className="article text-[#333]">
          {article.body && (
            <PortableText value={article.body} components={components} />
          )}
        </div>
      </article>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const article = await client.fetch(getArticleQuery(slug as string));

  const protocol = context.req.headers["x-forwarded-proto"] || "http"; // Use 'https' in production
  const host = context.req.headers.host;
  const fullUrl = `${protocol}://${host}${context.resolvedUrl}`;
  console.log("Full URL:", fullUrl);

  return {
    props: {
      article,
      fullUrl,
    },
  };
};

export default Article;
