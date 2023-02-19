import Document, { Head, Html, Main, NextScript } from 'next/document'
import siteConfig from '../../config/site.config'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content={siteConfig.siteDescription}/>
          <meta property="og:title" content={siteConfig.siteTitle}/>
          <meta property="og:site_name" content={siteConfig.siteTitle}/>
          <meta property="og:url" content={siteConfig.siteUrl}/>
          <meta property="og:description" content={siteConfig.siteDescription}/>
          <meta property="og:type" content={siteConfig.siteType}/>
          <meta property="og:image" content={siteConfig.siteImage} />
          <meta property="og:locale" content={siteConfig.siteLocale}/>
          <link rel="icon" href="/favicon.ico"/>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          {siteConfig.googleFontLinks.map(link => (
            <link key={link} rel="stylesheet" href={link} />
          ))}
        </Head>
        <body>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-2XJ1V5WZ5H"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-2XJ1V5WZ5H');
</script>

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
