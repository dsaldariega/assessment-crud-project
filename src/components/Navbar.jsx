import React from "react";

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
            <Link to="/register" className="text-white mr-4">
              Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
