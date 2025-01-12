import React, { useState, useEffect } from "react";
import { Home, Package, ShoppingCart, Users, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const NavItems = [
    { icon: Home, label: "Home" },
    { icon: Package, label: "Products" },
    { icon: ShoppingCart, label: "Orders" },
    { icon: Users, label: "Customers" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-gray-800 text-white transition-transform duration-300 ${
          isOpen || !isMobile ? "translate-x-0" : "-translate-x-full"
        } w-64 lg:relative lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-lg font-semibold tracking-wide">
            {isOpen ? "Eridanus Mall" : "EM"}
          </h1>
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-gray-300 hover:text-white transition"
            >
              <X />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          <ul className="space-y-2">
            {NavItems.map(({ icon: Icon, label }, index) => (
              <li key={index} className="group">
                <a
                  href="#"
                  className="flex items-center space-x-3 p-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition"
                >
                  <Icon className="w-5 h-5 group-hover:text-white" />
                  <span className={`${isOpen ? "block" : "hidden"} lg:block`}>
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 relative">
        {isMobile && !isOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-4 z-50 text-gray-600 dark:text-gray-300"
          >
            <Menu />
          </button>
        )}
      </main>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Navbar;
