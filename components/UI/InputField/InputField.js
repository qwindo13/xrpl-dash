import React, { useRef, useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useEffect } from "react";

const InputField = ({
  children,
  onClick,
  className,
  label,
  placeholder,
  icon,
  isRequired,
  value,
  onChange,
  description,
  sendIcon = false,
  reff,
}) => {
  const [inputValue, setInputValue] = useState("");
  // Update state on input change
  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  //   onChange && onChange(e); // Propagate the change to parent component
  // };
  //
  useEffect(() => {
    console.log(reff.current);
    if (reff.current) {
      setInputValue(reff.current.value);
    }
  }, [reff]);

  console.log(reff);
  return (
    <div className="w-full text-left">
      {label && (
        <label
          for="default-input"
          className="mb-2 block text-base font-semibold dark:text-white"
        >
          {label}
          {isRequired && (
            <span className="ml-1 text-xs font-semibold opacity-60">
              (required)
            </span>
          )}
        </label>
      )}

      <div className={`relative w-full `}>
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <span className="font-semibold text-white">{icon}</span>
          </div>
        )}
        <input
          type="text"
          // value={inputValue}
          // onChange={handleInputChange}
          className={`block h-full w-full bg-[#21212A] p-4 font-normal ${icon ? "pl-12" : "pl-4"} ${sendIcon ? "pr-12" : "pr-4"} text-medium rounded-2xl border border-transparent transition-all  duration-300 placeholder:text-white placeholder:opacity-40 hover:border-white hover:border-opacity-5 focus:border-white focus:border-opacity-70 active:border active:border-opacity-70 ${className}`}
          placeholder={placeholder}
          required={isRequired}
          maxLength={40}
          ref={reff}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClick();
            }
          }}
        />
        {sendIcon && (
          <div
            className={`absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4`}
            onClick={onClick}
          >
            <SendRoundedIcon
              className={`font-semibold text-white opacity-100`}
              sx={{ fontSize: 18 }}
              onClick={onClick}
            />
          </div>
        )}
      </div>
      {description && (
        <span className="text-xs font-semibold opacity-60">{description}</span>
      )}
    </div>
  );
};

export default InputField;
