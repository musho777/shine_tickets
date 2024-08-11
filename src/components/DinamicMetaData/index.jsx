import Head from 'next/head';
import { useEffect } from 'react';

const DynamicMeta = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="../../app/favicon.ico" />
        <meta name="description" content={description} />
      </Head>
    </>
  );
};
export default DynamicMeta;
