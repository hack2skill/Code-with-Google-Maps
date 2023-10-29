import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <Script src="js/jquery.min.js"></Script>
        <Script src="js/popper.min.js"></Script>
        <Script src="js/bootstrap.bundle.min.js"></Script>
        <Script src="js/jquery-3.0.0.min.js"></Script>

        <Script src="js/jquery.mCustomScrollbar.concat.min.js"></Script>
        <Script src="js/custom.js"></Script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
