import Head from "next/head";

import "../styles/globals.css";
import { Nav, Alert } from "../components";

import 'bootstrap/dist/css/bootstrap.css';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ressources citoyennes administration</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* bootstrap css */}
        <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
      </Head>

      <div className="app-container bg-light">
        <Nav />
        <Alert />
        <div className="container pt-4 pb-4">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default App;
