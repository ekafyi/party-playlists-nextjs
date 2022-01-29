import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";
import { APP_DESCRIPTION } from "../lib/constants";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content={APP_DESCRIPTION} />

          <link href="/favicon.ico" rel="shortcut icon" />
          <link href="/icons/icon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/icons/icon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/icons/apple-touch-icon.png" rel="apple-touch-icon" />
          <link href="/manifest.json" rel="manifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<style>.nojs-hidden{display:none!important} .nojs-opacity-100{opacity:1!important} .nojs-transform-none{transform:none!important}</style>`,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
