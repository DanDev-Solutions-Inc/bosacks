import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { urlFor } from "@utils/image-helper";
import { dateHelper } from "@utils/date-helper";
import { snipDescription } from "@utils/string-helper";

import { FeaturedArticleProps } from "@interfaces/FeaturedArticleProps";

const Button = dynamic(() => import("@components/button"));
const CategoryPill = dynamic(() => import("@components/category-pill"));

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <div className="container grid md:grid-cols-2 gap-6 my-10">
      <div>
        {article.image ? (
          <Link
            target="_blank"
            href={`/${article.categorySlug.current}/${article.slug.current}`}
          >
            <div className="relative">
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
            target="_blank"
            href={`/${article.categorySlug.current}/${article.slug.current}`}
          >
            <div className="relative">
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
      <div className="flex flex-col space-y-3 md:space-y-4 justify-center">
        <span className="text-[12px] text-primary font-medium">
          {dateHelper(article.publishedDate)}
        </span>
        <Link
          target="_blank"
          href={`/${article.categorySlug.current}/${article.slug.current}`}
          className="no-underline hover:text-primary transition-all"
        >
          <h1 className="text-[22px] md:text-[28px] leading-[100%] font-bold">
            {article.title}
          </h1>
        </Link>
        <p className="text-[14px] text-grey">
          {snipDescription(article.excerpt)}
        </p>
        <div className="max-w-[150px]">
          <Button
            text="Read More"
            onClick={() =>
              window.open(
                `/${article.categorySlug.current}/${article.slug.current}`,
                "_blank"
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
