import type {
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType,
} from "next";
import type { AppProps } from "next/app";

declare module "next" {
  type NextLayoutComponentType<P = {}> = NextComponentType<
    NextPageContext,
    any,
    P
  > & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

declare module "next/app" {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType;
  };
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SANITY_PROJECT_ID: string;
      SANITY_DATASET: string;
      CONSTANT_CONTACT_BASE_URL: string;
      CONSTANT_CONTACT_API_KEY: string;
      CONSTANT_CONTACT_ACCESS_TOKEN: string;
      CONSTANT_CONTACT_LIST_ID: string;
    }
  }
}
