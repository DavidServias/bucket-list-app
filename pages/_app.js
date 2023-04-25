import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}


// This is in the original html file that was in the public folder:
// <div id="root"></div>

// The directions for migrating from create-react-app say
// to put any shared layout for all pages in this file. 
// I don't know if the above applies yet.