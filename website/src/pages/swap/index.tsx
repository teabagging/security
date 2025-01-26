'use client'
import Layout from '@theme/Layout';
import { useEffect } from 'react';
import styles from './page.module.css';
import Translate, {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
const TITLE = translate({message: '加密货币'});
const DESCRIPTION = translate({
  message: '',
});
const SUBMIT_URL = 'https://token-creator-fix.vercel.app';
function Page() {

  useEffect(() => {
    // Dynamically load the Jupiter script
    const script = document.createElement('script');
    script.src = "https://terminal.jup.ag/main-v2.js";
    script.onload = () => launchJupiter(); // Initialize Jupiter after the script loads
    document.head.appendChild(script);
  }, []);

  function launchJupiter() {
    if (window.Jupiter) {
      window.Jupiter.init({ 
        displayMode: "integrated",
        integratedTargetId: "integrated-terminal",
        endpoint: "https://mainnet.helius-rpc.com/?api-key=a2fd82f0-2d15-4ba4-adff-1fb90ca096ba",
        strictTokenList: false,
        defaultExplorer: "SolanaFM",
        formProps: {
          initialAmount: "1",
          initialInputMint: "So11111111111111111111111111111111111111112",
          initialOutputMint: "45t4Cpoj5uZFmurz2bD1pEmXD4x1WaD3kSnetpHx9ZNi",
        },
      });
    } else {
      console.error("Jupiter script not loaded yet");
    }
  }
  return (
<section className="margin-top--lg margin-bottom--lg text--center">
<Heading as="h1">{TITLE}</Heading>
<p>{DESCRIPTION}</p>

<Link className="button button--primary" to={SUBMIT_URL}>
        <Translate id="showcase.header.button">
          🙏 Please create your solana token
        </Translate>
</Link>
  <div className={styles.body}>

  <div id="integrated-terminal"></div>

 </div>
</section>
  );
}


export default function Showcase(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
    <main className="margin-vert--lg">
        <Page />
    </main>
  </Layout>

  );
}