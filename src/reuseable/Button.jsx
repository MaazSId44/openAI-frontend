import React from "react";
import { ClipLoader } from "react-spinners";

const Button = ({
  children,
  loading,
  disabled,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  const baseClasses = `
    relative inline-flex justify-center items-center
    px-6 py-3 rounded-md
    font-semibold
    shadow-md
    focus:outline-none focus:ring-4
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-indigo-600 to-blue-500
      text-white
      hover:from-indigo-700 hover:to-blue-600
      focus:ring-indigo-300
    `,
    cancel: `
      bg-red-600
      text-white
      hover:bg-red-700
      focus:ring-red-300
    `,
    outline: `
      border border-gray-300
      text-gray-700
      hover:bg-gray-100
      focus:ring-gray-300
    `,
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
    >
      {loading ? <ClipLoader size={20} color="#fff" /> : children}
    </button>
  );
};

export default Button;
