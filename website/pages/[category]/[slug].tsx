import { GetServerSideProps } from "next";
import Image from "next/image";
import { PortableText, toPlainText } from "@portabletext/react";

import { client } from "@client";
import { getArticleQuery } from "@utils/groq-helper";
import { urlFor } from "@utils/image-helper";
import { components } from "@components/components";

const Article = ({ article }: any) => {
  return (
    <div>
      {article.image && (
        <Image
          src={urlFor(article.image).url()}
          alt={article.image.alt}
          width={500}
          height={500}
        />
      )}
      <div>Category: {article.category}</div>
      <div>Author: {article.author}</div>
      <div>{article.publishedDate}</div>
      {article.body && (
        <PortableText value={article.body} components={components} />
      )}
      {/* <div
        dangerouslySetInnerHTML={{ __html: toPlainText(article.body) }}
      ></div> */}
    </div>
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
