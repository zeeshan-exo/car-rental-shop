import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white flex items-center p-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
       
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Expo. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
