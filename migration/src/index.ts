import { createClient } from "@sanity/client";

import { htmlToBlocks } from "@sanity/block-tools";

import { convert } from "html-to-text";
import { Article } from "./interfaces/Article";
import json from "./assets/agility-data.json";
import { Author } from "./interfaces/Author";
import { Category } from "./interfaces/Category";
import { ArticleSanity } from "./interfaces/ArticleSanity";

import { Schema } from "@sanity/schema";
const { JSDOM } = require("jsdom");

const client = createClient({
  projectId: "fcyjcwi3",
  dataset: "production",
  token:
    "skM5D2PzOZBh5tKmFQH6YN2m1uBz6MkBxd38wzgxA4tRdicwwJODmzmi7kY8OHarzcM8SVUGmJCivYYx54YjYCgChIBlXZ2J3Kkhqx0i2zqErAcTEyxk28fnOhExYwwbSdTUSbmRgzdCm1nz1yFahrBWGdRTmdnwnk4edpfpOOa6dQffkg6P", // we need this to get write access
  useCdn: false,
  apiVersion: "2022-01-12",
});

const defaultSchema = Schema.compile({
  name: "myBlog",
  types: [
    {
      type: "object",
      name: "blogPost",
      fields: [
        {
          title: "Title",
          type: "string",
          name: "title",
        },
        {
          title: "Body",
          name: "body",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
  ],
});

const blockContentType = defaultSchema
  .get("blogPost")
  .fields.find((field: { name: string }) => field.name === "body").type;

const main = async () => {
  let articles = json.Article as unknown as Article[];

  for await (let article of articles) {
    const importData = transform(article);

    // continue;
    try {
      //1 - author
      console.log("importing... ", importData[1].title);
      await client.createOrReplace(importData[1]);

      //2 - category
      console.log("importing... ", importData[2].title);
      await client.createOrReplace(importData[2]);

      //0 - article
      console.log("importing... ", importData[0].title);
      await client.createOrReplace(importData[0]);
    } catch (e) {
      console.error((e as Error).message);
    }

    await delay(1000);
  }
};

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getCategory = (title: string): [number, string] => {
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

const transform = (_article: Article): [ArticleSanity, Author, Category] => {
  const authorId = `${_article.AuthorID}-agility-import`;
  const author: Author = {
    _id: authorId,
    _type: "author",
    title: _article.AuthorName,
  };

  const parsedCategory = getCategory(_article.Title);

  const categoryId = parsedCategory[0];
  const category: Category = {
    _id: categoryId.toString(),
    _type: "category",
    title: parsedCategory[1],
    slug: {
      _type: "slug",
      current: getSlug(parsedCategory[1] as string),
    },
  };

  const blocks = htmlToBlocks(_article.TextBlob, blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
  });

  const article: ArticleSanity = {
    _id: `${_article.Agility_ContentID}-agility-import`,
    _type: "article",
    title: _article.Title,
    slug: {
      _type: "slug",
      current: getSlug(_article.Title),
    },
    publishedDate: _article.ParsedDate,
    author: { _type: "reference", _ref: authorId.toString() },
    category: { _type: "reference", _ref: categoryId.toString() },
    excerpt: convert(_article.Excerpt),
    body: blocks,
  };

  return [article, author, category];
};

main();
