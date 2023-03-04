import { ArticleListingProps } from "@interfaces/ArticleListingProps";

const ArticleListing = ({ articles }: ArticleListingProps) => {
  return (
    <>
      {articles &&
        articles.map((a, index) => {
          return (
            <div key={index}>
              <div>{a.title}</div>
              <div>{a.category}</div>
              <div>{a.publishedDate}</div>
              <div>{a.excerpt}</div>
            </div>
          );
        })}
    </>
  );
};

export default ArticleListing;
