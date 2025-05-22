import React, { useState } from "react";

const TextArea = ({
  label,
  name,
  value,
  onChange,
  error,
  className = "",
  required = false,
  placeholder = "",
  rows = 4,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative w-full mb-6 ${className}`}>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || " "}
        rows={rows}
        aria-invalid={error ? "true" : "false"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`peer block w-full appearance-none rounded-lg border
          bg-transparent px-4 pt-6 pb-2
          text-base text-gray-900
          shadow-sm resize-none
          transition
          focus:outline-none
          ${
            error
              ? "border-red-500 focus:border-red-600 focus:ring-red-300 focus:ring-4"
              : "border-gray-300 focus:border-blue-600 focus:ring-blue-300 focus:ring-4"
          }
          ${isFocused && !error ? "shadow-md" : ""}
        `}
        {...props}
      />

      <label
        htmlFor={name}
        className={`absolute left-4 top-3 z-10 origin-[0] scale-100 transform
          cursor-text select-none
          bg-white px-1
          text-gray-500 text-sm font-medium
          transition-all
          peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100
          peer-placeholder-shown:text-gray-400
          peer-focus:-translate-y-1 peer-focus:scale-75 peer-focus:text-blue-600
          ${error ? "peer-focus:text-red-600 text-red-500" : ""}
        `}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
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

export default TextArea;
