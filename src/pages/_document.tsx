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

          {/* TODO icons */}
          {/* <link href="/favicon.ico" rel="shortcut icon">
          <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png">
          <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png">
          <link rel="apple-touch-icon" href="/apple-touch-icon.png">
          <link rel="manifest" href="/manifest.json"></link> */}
          {/* === */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
