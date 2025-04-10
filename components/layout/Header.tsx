import Link from "next/link";
import React from "react";

interface NavLinkWithHref {
  label?: string | React.ReactNode;
  href: string;
  onClick?: never; 
}

interface NavLinkWithOnClick {
  label?: string | React.ReactNode;
  href?: never; 
  onClick: () => void;
}

type NavLink = NavLinkWithHref | NavLinkWithOnClick

interface HeaderProps{
  title?: string | React.ReactNode,
  navLinks?: NavLink[]
  rightContent: React.ReactNode,
  className?: string
}

const Header: React.FC<HeaderProps> = ({ title, navLinks, rightContent, className}) => {
  return (
    <nav className=' w-full max-auto  p-4 '>
      <div className='flex justify-between items-center'>
        <div className='text-2xl font-bold font-sans tracking-wide'>{title}</div>
        <div className='hidden md:flex space-x-6 text-lg font-medium'>
          {navLinks && navLinks.map((link, index)=>(
            <div key={index}>
              {link.onClick ? (
                <button onClick={link.onClick} className="text-AppDark hover:text-AppPrimary">
                     {link.label}
                </button>
              ) :(
                <Link 
                href={link.href} 
                className="text-AppDark hover:text-AppPrimary"
                aria-label={typeof link.label === "string" ? link.label : "Navigation link"}
                >
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