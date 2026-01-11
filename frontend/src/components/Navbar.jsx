import React, { useState } from "react";
import { Upload, User, Menu, X, LogOutIcon, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "@/context/StateContext";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, logout } = useAppContext();

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 relative">
      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-lime-500 to-transparent opacity-60" />

      <div className="flex items-center justify-between h-16 px-4 md:px-6 text-white">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="h-9 w-auto" />
          <span className="text-lg md:text-xl font-bold tracking-wide">
            Stream<span className="text-lime-500">Hub</span>
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center bg-neutral-800 rounded-full px-4 py-2 w-[35%] hover:border hover:border-lime-500">
          <SearchInput />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/upload">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500 text-black font-semibold hover:bg-lime-400 transition">
              <Upload size={18} />
              Upload
            </button>
          </Link>
          {user ? (
            <>
              <Link to="/profile">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-700 hover:bg-neutral-800 transition">
                  <User size={18} />
                  Profile
                </button>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-700 hover:bg-neutral-800 transition"
              >
                <LogOutIcon size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-700 hover:bg-neutral-800 transition">
                <User size={18} />
                Login
              </button>
            </Link>
          )}
        </nav>

        {/* Mobile Icons */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <Search />
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center bg-neutral-800 rounded-full px-4 py-2 hover:border hover:border-lime-500">
            <SearchInput />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-neutral-800">
          <div className="flex flex-col gap-4 p-4">
            <Link to="/upload">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-lime-500 text-black font-semibold w-full">
                <Upload size={18} />
                Upload
              </button>
            </Link>
            {user ? (
              <>
                <Link to="/profile">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-white w-full">
                    <User size={18} />
                    profile
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-white w-full"
                >
                  <LogOutIcon size={18} />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-white w-full">
                  <User size={18} />
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
