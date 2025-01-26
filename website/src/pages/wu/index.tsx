import React, { useState } from 'react';
import PoemCard from './PoemCard';
import poemsData from './1.json'; // Ensure this is a valid import
import styles from './PoemCard.module.css';
import Layout from '@theme/Layout';

import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// TopBanner component for additional UI
function TopBanner() {
  const announcedVersion = useDocusaurusContext().siteConfig.customFields
    ?.announcedVersion as string;

  return (
    <div className={styles.topBanner}>
      <div className={styles.topBannerTitle}>
        {'🎉\xa0'}
        <Link
          to="https://www.543x.com"
          className={styles.topBannerTitleText}>
          <Translate
            id="homepage.banner.launch.newVersion"
            values={{ newVersion: announcedVersion }}>
            {'地区列表'}
          </Translate>
        </Link>
        {'\xa0🥳'}
      </div>
    </div>
  );
}

const App: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(20);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 20);
  };

  // Ensure poemsData is in the correct format (should be an object of province -> cities)
  return (
    <div>
      <div className={styles.cardContainer}>
        {Object.keys(poemsData)
          .slice(0, visibleCount)
          .map((province, index) => (
            <PoemCard key={index} poem={{ province, cities: poemsData[province] }} />
          ))}
      </div>
      {visibleCount < Object.keys(poemsData).length && (
        <button className={styles.loadMoreButton} onClick={loadMore}>
          查看更多
        </button>
      )}
    </div>
  );
};

export default function Home(): JSX.Element {
  return (
    <Layout>
      <main>
        <TopBanner />
        <div className={styles.section}>
          <App />
        </div>
      </main>
    </Layout>
  );
}
