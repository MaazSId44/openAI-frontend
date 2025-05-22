import React, { useState } from "react";

const TextField = ({
  label,
  name,
  value,
  onChange,
  error,
  className = "",
  required = false,
  placeholder = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative w-full mb-6 ${className}`}>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="" 
        aria-invalid={error ? "true" : "false"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          peer block w-full rounded-md border bg-white px-4 pt-6 pb-2
          text-base text-gray-900 shadow-sm
          transition duration-300
          focus:outline-none
          ${error
            ? "border-red-500 focus:border-red-600 focus:ring-red-300 focus:ring-2"
            : "border-gray-300 focus:border-blue-600 focus:ring-blue-300 focus:ring-2"}
          ${isFocused && !error ? "shadow-md" : ""}
        `}
        {...props}
      />

      <label
        htmlFor={name}
        className={`
          absolute left-3 top-2 z-10 px-1
          text-sm font-semibold text-gray-500
          bg-white
          cursor-text
          transition-all duration-300
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal
          peer-focus:top-2 peer-focus:text-blue-600 peer-focus:text-sm peer-focus:font-semibold
          ${error ? "peer-focus:text-red-600 text-red-500" : ""}
        `}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {error && (
        <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextField;
