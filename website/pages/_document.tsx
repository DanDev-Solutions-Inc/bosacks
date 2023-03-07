import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          {/* <!-- Begin Constant Contact Active Forms --> */}
          <Script id="constant-contact" strategy="afterInteractive">
            {`var _ctct_m="cf1083a536139286bb64b0721277ac0e";`}
          </Script>
          <script
            id="signupScript"
            src="//static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js"
            async
            defer
          />
          {/* <!-- End Constant Contact Active Forms --> */}
        </body>
      </Html>
    );
  }
}
