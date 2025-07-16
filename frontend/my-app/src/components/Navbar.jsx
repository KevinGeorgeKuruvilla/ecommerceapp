import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaPinterestP,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  // Get user from localStorage when component loads
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/auth");
  };

  return (
    <header className="w-full">
      <div className="top-bar bg-gray-800 text-white py-2 px-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* <p className="text-sm" className="text-2xl font-bold text-yellow-700">
            Welcome to Techplaza
          </p> */}
          <div className="flex space-x-3 text-sm">
            <a href="#" className="hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-300">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-red-600">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-red-400">
              <FaPinterestP />
            </a>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-purple-700">
            Techplaza
          </Link>

          <div className="flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-purple-700">
              HOME
            </Link>

            <Link to="/shop" className="hover:text-purple-700">
              SHOP
            </Link>
            <Link to="/blog" className="hover:text-purple-700">
              BLOG
            </Link>
            <Link to="/contact" className="hover:text-purple-700">
              CONTACT
            </Link>
            {/* ✅ Admin link only visible for admin users */}
            {user?.isAdmin && (
              <Link
                to="/admin/dashboard"
                className=" text-red-600 font-semibold  rounded-xl shadow"
              >
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-purple-700">
              <FaSearch size={16} />
            </button>
            <Link
              to="/cart"
              className="relative text-gray-600 hover:text-purple-700"
            >
              <FaShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                0
              </span>
            </Link>

            {/* Conditional rendering */}
            {user ? (
              <div className="relative group">
                <button
                  onClick={() => setShowMenu((prev) => !prev)}
                  className="flex items-center space-x-1 bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700"
                >
                  <FaUserCircle size={18} />
                  <span>{user.name || "User"}</span>
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
