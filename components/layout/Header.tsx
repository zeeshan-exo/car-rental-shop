
import Link from "next/link";
import React from "react";
// import PropTypes from "prop-types";

interface NavLink{
  label: string,
  href?: string
  onClick?: ()=> void
}

interface HeaderProps{
  title: string,
  navLinks: NavLink[]
  rightContent: React.ReactNode,
  clasName: string
}

const Header = ({ title, navLinks, rightContent, className }: HeaderProps) => {
  return (
    <nav className=' w-full max-auto  p-4 '>
      <div className='flex justify-between items-center'>
      
        <div className='text-2xl font-bold font-sans tracking-wide'>{title}</div>

        {/* <ul className='hidden md:flex space-x-6 text-lg font-medium'>
          {navLinks.map((link, idx) => (
            <li key={idx} className="hover:text-gray-300 transition duration-300">
              {link.href ? (
                <Link href={link.href}>{link.label}</Link>
              ) : (
                <span>{link.label}</span>
              )}
            </li>
          ))}
        </ul> */}

        <div className='hidden md:flex space-x-6 text-lg font-medium'>
          {navLinks.map((link, idx)=>(
            <div key={idx}>
              {link.onClick ? (
                <button onClick={link.onClick} className="text-gray-600 hover:text-blue-500">
                     {link.label}
                </button>
              ) :(
                <Link href={link.href} className="text-gray-600 hover:text-blue-500">
                {link.label}
                </Link>
              )}
            </div>
          ))}

        </div>

        <div>
          {rightContent}
          </div>
      </div>
    </nav>
  );
};

export default Header;
