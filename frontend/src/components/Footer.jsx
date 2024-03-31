import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-white text-center">
      © {new Date().getFullYear()} My Note App. All rights reserved.
    </footer>
  );
};

export default Footer;
