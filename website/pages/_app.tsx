import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";

import "@styles/globals.css";

const Page = dynamic(() => import("@layout/page"));

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout =
    Component.getLayout || ((page: ReactNode) => <Page>{page}</Page>);
  return getLayout(<Component {...pageProps} />);
};

export default MyApp;
