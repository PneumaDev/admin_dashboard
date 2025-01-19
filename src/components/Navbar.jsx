import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { AdminContext } from "../context/AdminContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { logOut } = useContext(AdminContext);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(true);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const NavItems = [
    { icon: Home, label: "Home", path: "/", count: null },
    { icon: Package, label: "Products", path: "/products", count: 24 },
    { icon: ShoppingCart, label: "Orders", path: "/orders", count: 5 },
    { icon: Users, label: "Customers", path: "/customers", count: 128 },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-gray-800 text-white transition-all duration-300 ease-in-out
          ${isOpen || !isMobile ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "w-20" : "w-64"}
          lg:relative lg:translate-x-0 flex flex-col justify-between`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h1
              className={`text-lg font-semibold tracking-wide font-yantramanav transition-opacity duration-200 
              ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}`}
            >
              Eridanus Mall
            </h1>
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-lg hover:bg-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 flex-1 px-2">
          <ul className="space-y-2">
            {NavItems.map(({ icon: Icon, label, path, count }, index) => (
              <li key={index} className="group">
                <Link
                  to={path}
                  onClick={() => {
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200
                    ${
                      location.pathname === path
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`w-5 h-5 ${
                        location.pathname === path
                          ? "text-white"
                          : "group-hover:text-white"
                      }`}
                    />
                    <span
                      className={`transition-opacity duration-200
                      ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}
                      ${!isCollapsed && "font-yantramanav"}`}
                    >
                      {label}
                    </span>
                  </div>
                  {count !== null && !isCollapsed && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-700 group-hover:bg-gray-600">
                      {count}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logOut}
            className="flex items-center space-x-3 w-full p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span
              className={`transition-opacity duration-200
              ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}
              ${!isCollapsed && "font-yantramanav"}`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:p-0 p-6 bg-white dark:bg-gray-800">
        {isMobile && !isOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-2 z-50 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        {/* Main content goes here */}
      </main>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Navbar;
