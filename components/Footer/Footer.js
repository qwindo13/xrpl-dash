import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className='w-full flex items-center justify-center'>
      <span className='text-sm font-semibold opacity-60'>Created by Greyhound © {year}</span>
    </footer>
  );
};

export default Footer;
