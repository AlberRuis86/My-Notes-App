import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default App;