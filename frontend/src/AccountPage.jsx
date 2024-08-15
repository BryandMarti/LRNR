import React from 'react';
import Header from './components/Header';
import AccountInfo from './components/AccountInfo';
import AccountStats from './components/AccountStats';
import Footer from './components/Footer';

const AccountPage = () => {
  return (
    <>
      <Header />
      <AccountInfo />
      <AccountStats />
      <Footer />
    </>
  );
};

export default AccountPage;
