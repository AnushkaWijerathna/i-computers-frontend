import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { MdOutlineMenuOpen } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Header() {
  const [sidebarOpen, setSideBarOpen] = useState(false);

  return (
    // Improved header: glassy background, better spacing, subtle shadow
    <header className="w-full h-[100px] bg-accent/90 backdrop-blur-md flex items-center relative px-8 shadow-sm z-10">
      <MdOutlineMenuOpen
        onClick={() => {
          setSideBarOpen(true);
        }}
        className="rotate-180 text-white text-4xl my-auto lg:hidden"
      />
      {/* Logo with better sizing & alignment */}
      <img
        src="/logo.png"
        className="h-[70%] object-contain select-none pl-2"
        alt="logo"
      />

      {/* Navigation - improved typography, spacing, hover micro-interactions */}
      <div className="w-full h-full hidden lg:flex text-primary justify-center items-center gap-8 text-lg font-medium">
        <Link
          to="/"
          className="relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full transition-colors hover:text-primary/80"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full transition-colors hover:text-primary/80"
        >
          Products
        </Link>
        <Link
          to="/about"
          className="relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full transition-colors hover:text-primary/80"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full transition-colors hover:text-primary/80"
        >
          Contact Us
        </Link>
      </div>

      {/* Cart icon - elevated, better touch target, subtle hover animation */}
      <Link
        to="/cart"
        className="absolute right-6 top-1/2 -translate-y-1/2 text-primary text-2xl p-3 rounded-full hover:bg-primary/10 transition-all duration-200 hover:scale-105"
      >
        <BiShoppingBag />
      </Link>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-9999 lg:hidden">
          <div className="fixed top-0 left-0 w-[300px] h-screen border-white border-2 shadow-2xl z-10000">
            {/* SLIDING PANEL */}
            <div className="absolute inset-0 bg-white transform translate-x-0 transition-transform duration-300 flex flex-col">
              {/* HEADER */}
              <div className="w-full h-[100px] bg-accent flex justify-center items-center">
                <img
                  src="/logo.png"
                  className="h-[70%] object-contain select-none"
                  alt="logo"
                />
                <MdOutlineMenuOpen
                  onClick={() => {
                    setSideBarOpen(false);
                  }}
                  className=" text-white text-4xl my-auto  lg:hidden"
                />
              </div>
              <div className="w-full h-full text-xl text-secondary flex flex-col justify-start items-start gap-4">
                <a
                  href="/"
                  className="w-full text-secondary transition-all duration-300 hover:text-accent hover:translate-x-2"
                >
                  Home
                </a>

                <a
                  href="/products"
                  className="w-full text-secondary transition-all duration-300 hover:text-accent hover:translate-x-2"
                >
                  Products
                </a>

                <a
                  href="/about"
                  className="w-full text-secondary transition-all duration-300 hover:text-accent hover:translate-x-2"
                >
                  About Us
                </a>

                <a
                  href="/contact"
                  className="w-full text-secondary transition-all duration-300 hover:text-accent hover:translate-x-2"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
