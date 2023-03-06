// const sanityClient = require("@sanity/client");

import { convert } from "html-to-text";
import { Article } from "./interfaces/Article";
import json from "./assets/agility-data.json";

// const client = sanityClient({
//   projectId: "<your-project-id>",
//   dataset: "<your-dataset>",
//   token: "<your-token-with-write-access>", // we need this to get write access
//   useCdn: false, // We can't use the CDN for writing
// });

const main = () => {
  let articles = json.Article as unknown as Article[];
  for (let article of articles) {
    console.log(transform(article));
  }
};

const getCategory = (title: string) => {
  if (title.includes("BoSacks Speaks Out")) {
    return [1, "BoSacks Speaks Out"];
  } else if (title.includes("BoSacks Readers Speak Out")) {
    return [2, "Readers Speak Out"];
  }

  return [3, "General"];
};

const getSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const transform = (_article: Article) => {
  const authorId = `${_article.AuthorID}-agility-import`;
  const author = {
    _id: authorId,
    _type: "author",
    title: _article.AuthorName,
  };

  const parsedCategory = getCategory(_article.Title);

  const categoryId = parsedCategory[0];
  const category = {
    _id: categoryId,
    title: parsedCategory[1],
    slug: {
      _type: "slug",
      current: getSlug(parsedCategory[1] as string),
    },
  };

  const article = {
    _id: `${_article.Agility_ContentID}-agility-import`,
    _type: "article",
    title: _article.Title,
    slug: {
      _type: "slug",
      current: getSlug(_article.Title),
    },
    publishedDate: _article.ParsedDate,
    author: { _type: "reference", _ref: authorId },
    category: { _type: "reference", _ref: categoryId },
    excerpt: convert(_article.Excerpt),
    body: convert(_article.TextBlob),
  };

  return [article, author, category];
};

main();
