import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { ArticleItemProps } from "@interfaces/ArticleItemProps";
import { urlFor } from "@utils/image-helper";
import { snipDescription } from "@utils/string-helper";
import { dateHelper } from "@utils/date-helper";
import { Arrow } from "./icons";

const CategoryPill = dynamic(() => import("@components/category-pill"));

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <article className="group">
      <div>
        {article.image ? (
          <Link
            href={`/${article.categorySlug.current}/${article.slug.current}`}
          >
            <div className="relative mb-4">
              <Image
                src={urlFor(article.image).url()}
                alt={article.title}
                width={1024}
                height={350}
                priority
              />
            </div>
          </Link>
        ) : (
          <Link
            href={`/${article.categorySlug.current}/${article.slug.current}`}
          >
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
          </Link>
        )}
      </div>
      <Link href={`/${article.categorySlug.current}/${article.slug.current}`}>
        <div className="flex flex-col space-y-3">
          <h2 className="font-bold text-[22px] leading-[100%] group-hover:text-primary transition-all">
            {article.title}
          </h2>
          <p className="text-grey text-[14px]">
            {snipDescription(article.excerpt)}
          </p>
          <div className="flex justify-between">
            <span className="text-[12px] text-primary">
              {dateHelper(article.publishedDate)}
            </span>
            <Arrow />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleItem;
