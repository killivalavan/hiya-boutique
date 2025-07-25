import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Web App Manifest */}
          <link rel="manifest" href="/manifest.json" />

          {/* Optional: Favicon & Theme */}
          <link rel="apple-touch-icon" href="/logo.png" sizes="180x180" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
