import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <title>{'Products'}</title>
            <meta name="description" content={'Products description.'} />
            <meta property="og:title" content={'Products Page Title'} />
            <meta property="og:description" content={'Products description about the page.'} />
            <meta property="og:image" content={'products.jpg'} />
            <meta property="og:type" content="website" />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
