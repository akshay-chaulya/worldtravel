import { useEffect, useState } from "react";
import { NavLinks, UserProfileMenu } from "../";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (e.target.closest(".main-menu")) return;
      setMenuOpen(false);
    }

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [setMenuOpen]);

  return (
    <nav className="z-40 fixed top-0 left-0 right-0 bg-white border-gray-200 text-black dark:bg-gray-900 text-xl">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/images/logo.png"
            className="h-8 rounded-3xl"
            alt="Worldtravel Logo"
          />
          <span className="self-center text-2xl text-inherit font-bold whitespace-nowrap dark:text-white">
            Worldtravel
          </span>
        </NavLink>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          <UserProfileMenu />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            data-collapse-toggle="navbar-user"
            type="button"
            className="main-menu inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <NavLinks
          closeTheMenu={() => setMenuOpen(false)}
          status={menuOpen ? "block" : "hidden"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
