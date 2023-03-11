import { GetServerSideProps } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import { PortableText } from "@portabletext/react";
import { dateHelper } from "@utils/date-helper";

import { client } from "@client";
import { getArticleQuery } from "@utils/groq-helper";
import { urlFor } from "@utils/image-helper";
import { components } from "@components/components";

const CategoryPill = dynamic(() => import("@components/category-pill"));

const Article = ({ article }: any) => {
  return (
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
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const article = await client.fetch(getArticleQuery(slug as string));

  return {
    props: {
      article,
    },
  };
};

export default Article;
