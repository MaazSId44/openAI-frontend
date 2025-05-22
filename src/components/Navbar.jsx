// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Item Management" },
  { to: "/openai", label: "OpenAI Prompt" },
];

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-100">
      <ul className="flex justify-center gap-6">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;