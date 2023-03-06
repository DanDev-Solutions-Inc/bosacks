import Image from "next/image";
import { useRouter } from "next/router";

import { ArticleItemProps } from "@interfaces/ArticleItemProps";
import { urlFor } from "@utils/image-helper";
import { snipDescription } from "@utils/string-helper";

const ArticleItem = ({ article }: ArticleItemProps) => {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer"
      onClick={() =>
        router.push(`/${article.categorySlug.current}/${article.slug.current}`)
      }
    >
      {article.image && (
        <Image
          src={urlFor(article.image).url()}
          alt={article.image.alt}
          width={250}
          height={250}
        />
      )}
      <div className="font-bold">{article.title}</div>
      <div>Category: {article.category}</div>
      <div>Author: {article.author}</div>
      <div>{article.publishedDate}</div>
      <div>{snipDescription(article.excerpt)}</div>
    </div>
  );
};

export default ArticleItem;
