import Head from 'next/head';
import { useEffect } from 'react';

const DynamicMeta = ({ title, description, keywords }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="../../app/favicon.ico" />
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
    </>
  );
};
export default DynamicMeta;
