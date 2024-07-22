// components/Layout.js
import Head from 'next/head';

const AuthLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Your Page Title</title>
        <meta name="description" content="Your page description" />
        {/* Add any other meta tags you need */}
      </Head>
      <main>{children}</main>
    </>
  );
};

export default AuthLayout;