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
  const getImageURL = (image: any) => {
    try {
      const url = urlFor(image).url();
      return url;
    } catch (e) {
      console.error((e as Error).message);
    }
    return "";
  };

  return (
    <div className="group mb-6 md:mb-0">
      {article.image && getImageURL(article.image) ? (
        <Link href={`/${article.categorySlug.current}/${article.slug.current}`}>
          <div className="relative mb-4 w-full h-[250px] md:h-[350px]">
            <CategoryPill category={article.category} />
            <Image
              src={getImageURL(article.image)}
              alt={article.title}
              fill
              sizes="100%"
              priority
              className="object-cover"
            />
          </div>
        </Link>
      ) : (
        <Link href={`/${article.categorySlug.current}/${article.slug.current}`}>
          <div className="relative mb-4 w-full h-[250px] md:h-[350px]">
            <CategoryPill category={article.category} />
            <Image
              src="/assets/article-image-placeholder.jpeg"
              alt={article.title}
              sizes="100%"
              fill
              priority
              className="object-cover"
            />
          </div>
        </Link>
      )}

      <Link href={`/${article.categorySlug.current}/${article.slug.current}`}>
        <div className="flex flex-col space-y-3">
          <h2 className="font-bold text-[22px] leading-[100%] group-hover:text-primary transition-all">
            {article.title}
          </h2>
          <p className="text-[#333] text-[14px]">
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
    </div>
  );
};

export default ArticleItem;
