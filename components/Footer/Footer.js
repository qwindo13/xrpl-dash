import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer>
      <span className='text-sm font-semibold opacity-60'>Created by Greyhound © {year}</span>
    </footer>
  );
};

export default Footer;
