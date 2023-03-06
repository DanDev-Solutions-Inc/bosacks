import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { urlFor } from "@utils/image-helper";
import { dateHelper } from "@utils/date-helper";
import { truncateHelper } from "@utils/truncate-helper";

import { FeaturedArticleProps } from "@interfaces/FeaturedArticleProps";

const Button = dynamic(() => import("@components/button"));

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  const router = useRouter();
  return (
    <div className="container grid md:grid-cols-2 gap-6 my-10">
      <div>
        {article.image ? (
          <Link
            href={`/${article.categorySlug.current}/${article.slug.current}`}
          >
            <Image
              src={urlFor(article.image).url()}
              alt={article.title}
              width={1024}
              height={350}
            />
          </Link>
        ) : (
          <Link
            href={`/${article.categorySlug.current}/${article.slug.current}`}
          >
            <Image
              src="/assets/article-image-placeholder.jpeg"
              alt={article.title}
              width={1024}
              height={350}
            />
          </Link>
        )}
      </div>
      <div className="flex flex-col space-y-4 justify-center">
        <span className="text-[12px] text-primary font-medium">
          {dateHelper(article.publishedDate)}
        </span>
        <Link
          href={`/${article.categorySlug.current}/${article.slug.current}`}
          className="no-underline hover:text-primary transition-all"
        >
          <h1 className="text-[28px] leading-[100%] font-bold">
            {article.title}
          </h1>
        </Link>
        <p>{truncateHelper(article.excerpt, 150)}</p>
        <div className="max-w-[150px]">
          <Button
            text="Read More"
            onClick={() =>
              router.push(
                `/${article.categorySlug.current}/${article.slug.current}`
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
