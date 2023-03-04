import { ArticleListingProps } from "@interfaces/ArticleListingProps";

const ArticleListing = ({ articles }: ArticleListingProps) => {
  return (
    <div>
      {articles &&
        articles.map((a) => {
          return (
            <div key={a._id}>
              <div>{a.title}</div>
              <div>{a.category}</div>
              <div>{a.publishedDate}</div>
            </div>
          );
        })}
    </div>
  );
};

export default ArticleListing;
