import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head >
      <meta charSet="utf-8" />
      {/* <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> */}
    
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />
      {/* the next line added as instructed by the material UI docs */}
    

      {/* the client ID needs to be hidden
      <meta name="google-signin-client_id" content= "845379710734-vv3tm1qqp004uv7kb6f75l7rcrkb3ese.apps.googleusercontent.com"/>  */}
      

      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        {/* manifest.json provides metadata used when your web app is installed on a
        user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/ */}
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      
        {/* Notice the use of %PUBLIC_URL% in the tags above.
        It will be replaced with the URL of the `public` folder during the build.
        Only files inside the `public` folder can be referenced from the HTML.

        Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
        work correctly both with client-side routing and a non-root public URL.
        Learn how to configure a non-root public URL by running `npm run build`. */}
    
    
      <script src="https://accounts.google.com/gsi/client" async defer></script>  
  </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
