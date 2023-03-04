import { GetServerSideProps } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

import { client } from "@client";
import { getArticleQuery } from "@utils/groq-helper";
import { urlFor } from "@utils/image-helper";

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
      <div>{article.category}</div>
      <div>{article.publishedDate}</div>
      {article.body && <PortableText value={article.body} />}
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
