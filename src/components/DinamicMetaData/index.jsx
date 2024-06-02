import Head from 'next/head';
import { useEffect } from 'react';

const DynamicMeta = ({ title, description }) => {
  useEffect(() => {
    // Update the title of the page
    document.title = title;
  }, [title]);

  return (
    <>
      <Head>
        {/* Set dynamic metadata */}
        <meta name="description" content={description} />
      </Head>
    </>
  );
};
export default DynamicMeta;
