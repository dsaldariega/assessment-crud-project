import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl">
          {user ? `Hello, ${user}` : "Welcome"}
        </div>
        <div>
          {user ? (
            <>
              <button onClick={onLogout} className="text-white px-4">
                Logout
              </button>
            </>
          ) : (
            // <Link to="/" className="text-white px-4">
            //   Login
            // </Link>
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
