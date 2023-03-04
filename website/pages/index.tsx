import { useContext } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

import { HomePageProps } from "@interfaces/HomePageProps";
import { Global } from "@interfaces/sanity/Global";
import { HomePage } from "@interfaces/sanity/HomePage";
import { client } from "@client";
import { Article } from "@interfaces/sanity/Article";
import { urlFor } from "@utils/image-helper";
import { SubscribeModalContext } from "@context/subscribe-modal-context";

const Profile = dynamic(() => import("@components/profile"));
const Button = dynamic(() => import("@components/button"));

const Home: NextPage<HomePageProps> = ({
  page,
  configuration,
  articles,
}: HomePageProps) => {
  const { isOpen, setIsOpen } = useContext(SubscribeModalContext);

  return (
    <>
      <NextSeo
        title={page.title}
        description="A veteran of the printing/publishing industry, BoSacks has always been an innovator who regularly electrifies the media."
      />
      <div>
        {page.heroImage && (
          <Image
            src={urlFor(page.heroImage).url()}
            alt={page.heroImage.alt}
            width={500}
            height={500}
          />
        )}
      </div>
      <Profile configuration={configuration} />
      <div>
        {articles &&
          articles.map((a) => {
            return (
              <div key={a._id}>
                <span>{a.title}</span>
                {/* <PortableText value={a.body} /> */}
              </div>
            );
          })}
      </div>
      <Button text={"Subscribe"} onClick={() => setIsOpen?.(!isOpen)} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const page: HomePage = await client.fetch(`*[_type == "homePage"][0]`);
  const configuration: Global = await client.fetch(`*[_type == "global"][0]`);
  const articles: Article[] = await client.fetch(`*[_type == "article"]`);

  return {
    props: { page, configuration, articles },
  };
};

export default Home;
