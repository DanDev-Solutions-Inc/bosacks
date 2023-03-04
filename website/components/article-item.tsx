import Image from "next/image";

import { ArticleItemProps } from "@interfaces/ArticleItemProps";
import { urlFor } from "@utils/image-helper";

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <div className="h-[1000px]">
      {article.image && (
        <Image
          src={urlFor(article.image).url()}
          alt={article.image.alt}
          width={250}
          height={250}
        />
      )}
      <div>{article.title}</div>
      <div>{article.category}</div>
      <div>{article.publishedDate}</div>
      <div>{article.excerpt}</div>
    </div>
  );
};

export default ArticleItem;
