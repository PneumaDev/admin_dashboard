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
  Moon,
  Sun,
  ImageIcon,
  Presentation,
  Truck,
} from "lucide-react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const {
    logOut,
    theme,
    toggleTheme,
    navigate,
    backendUrl,
    counts,
    setCounts,
  } = useContext(AdminContext);

  useEffect(() => {
    getCountTotal();

    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // if (!mobile) setIsOpen(true);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCountTotal = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/order/count`);
      setCounts(response.data.counts);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    // setIsCollapsed(!isCollapsed);
  };

  const NavItems = [
    { icon: Home, label: "Home", path: "/", count: null },
    {
      icon: ShoppingCart,
      label: "Orders",
      path: "/orders",
      count: counts[2]?.total ?? 0,
    },
    {
      icon: Package,
      label: "Products",
      path: "/products",
      count: counts[1]?.total ?? 0,
    },
    {
      icon: Users,
      label: "Customers",
      path: "/customers",
      count: counts[0]?.total ?? 0,
    },
    {
      icon: Truck,
      label: "Suppliers",
      path: "/suppliers",
      count: null,
    },
    { icon: ImageIcon, label: "Media", path: "/media", count: null },
    { icon: Presentation, label: "Metrics", path: "/metrics", count: null },
  ];

  return (
    <div className="flex h-screen bg-[var(--bg-color)]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-[var(--bg-color)] text-[var(--text-color)] transition-all duration-300 ease-in-out
        ${isOpen || !isMobile ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "w-20" : "w-64"}
        lg:relative lg:translate-x-0 flex flex-col justify-between`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center">
          <div className="flex justify-between items-center space-x-4">
            <h1
              className={`text-lg font-semibold tracking-wide transition-opacity duration-200 font-yantramanav
            ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}`}
            >
              Eridanus Mall
            </h1>
            <div>
              <button
                onClick={toggleTheme}
                className="w-full flex cursor-pointer items-center justify-center gap-2 p-2 bg-[var(--hover-bg)] rounded-lg transition"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-lg hover:bg-[var(--hover-bg)] transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 flex-1 px-2">
          <ul className="space-y-2">
            {NavItems.map(({ icon: Icon, label, path, count }, index) => (
              <li key={index} className="group">
                <Link
                  to={path}
                  onClick={() => isMobile && toggleSidebar()}
                  className={`flex items-center justify-between font-imprima p-3 rounded-lg transition-all  duration-200
                  ${
                    location.pathname === path
                      ? "bg-[var(--hover-bg)]"
                      : "hover:bg-[var(--hover-bg)]"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    <span>{label}</span>
                  </div>
                  {count !== null && !isCollapsed && (
                    <span className="px-2 py-1 text-xs font-muktaVaani font-medium rounded-full bg-[var(--hover-bg)]">
                      {count}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-[var(--border-color)]">
          <button
            onClick={logOut}
            className="flex items-center space-x-3 font-imprima w-full p-3 hover:bg-[var(--hover-bg)] rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:p-0 p-6 bg-[var(--bg-color)]">
        {isMobile && !isOpen && (
          <div className="flex flex-col space-y-4">
            {/* Toggle Sidebar Button */}
            <button
              onClick={toggleSidebar}
              className="absolute top-4 left-2 z-50 p-1 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--hover-bg)] transition"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Dynamic Navigation Buttons */}
            {NavItems.map(({ icon: Icon, path }, index) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`absolute left-2 z-50 p-1 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--hover-bg)] transition ${
                  location.pathname === path ? "bg-[var(--hover-bg)]" : ""
                }`}
                style={{ top: `${4 + index * 3}rem` }}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Navbar;
