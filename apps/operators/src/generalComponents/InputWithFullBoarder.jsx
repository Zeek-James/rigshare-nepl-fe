import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";

const InputWithFullBorder = ({
  id,
  type,
  value,
  onChange,
  label,
  checked,
  onClick,
  className,
  hasSuffix,
  hasPrefix,
  placeholder,
  row = "3",
  icon,
  accept,
  isTextArea = false,
  radioOptions = [],
  radioDirection = "row", // 'row' or 'column'
  wrapperClassName,
  required = false,
  maxLength,
  errorMessage = "",
  ...props
}) => {
  // Handler for input validation
  const handleInputChange = (e) => {
    onChange(e);
  };

  return (
    <div className={`flex flex-col mb-4 ${wrapperClassName}`}>
      <label className='text-13px md:text-14px font-medium mb-2' htmlFor={id}>
        {label && (
          <>
            {label}
            {required && <span className='text-red-700 text-[14px]'>*</span>}
          </>
        )}
      </label>
      {type === "radio" && radioOptions.length > 0 ? (
        <div
          className={`flex ${
            radioDirection === "column" ? "flex-col" : "flex-row"
          } gap-4`}
        >
          {radioOptions.map((option, index) => (
            <label key={index} className='flex items-center gap-2 text-sm'>
              <input
                type='radio'
                // name={name || id}
                value={option.value}
                checked={value === option.value}
                onChange={handleInputChange}
                className='h-[24px] w-[24px] border-2 border-brandPurple rounded-full checked:bg-brandPurple checked:border-brandPurple focus:outline-none'
                required={required}
              />
              {option.label}
            </label>
          ))}
        </div>
      ) : isTextArea ? (
        <textarea
          id={id}
          className={`border border-lightGrey bg-lightGrey/30 p-2 rounded-md ${className} outline-none focus:outline-none`}
          cols='50'
          rows={row}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        ></textarea>
      ) : hasSuffix ? (
        <div
          className={`border ${
            errorMessage
              ? "border-[#F59F9F]"
              : "border-lightGrey bg-lightGrey/30"
          } p-2 rounded-md placeholder:text-[12px] ${className} outline-none focus:outline-none flex items-center justify-between`}
        >
          <input
            onClick={onClick}
            type={type}
            placeholder={placeholder}
            id={id}
            accept={accept}
            checked={checked}
            color='white'
            value={value}
            onChange={handleInputChange}
            required={required}
            maxLength={maxLength}
            {...props}
            className={`bg-transparent outline-none focus:outline-none w-full placeholder:text-[12px] mr-4 `}
          />
          <div>{icon}</div>
        </div>
      ) : hasPrefix ? (
        <div
          className={`border ${
            errorMessage
              ? "border-[#F59F9F]"
              : "border-lightGrey bg-lightGrey/30"
          } p-2 rounded-md placeholder:text-[12px] ${className} outline-none focus:outline-none flex items-center justify-between`}
        >
          <div>{icon}</div>
          <input
            onClick={onClick}
            type={type}
            placeholder={placeholder}
            id={id}
            accept={accept}
            checked={checked}
            color='white'
            value={value}
            onChange={handleInputChange}
            required={required}
            maxLength={maxLength}
            {...props}
            className={`bg-transparent outline-none focus:outline-none w-full placeholder:text-[12px] ml-4 `}
          />
        </div>
      ) : (
        <input
          onClick={onClick}
          type={type}
          id={id}
          accept={accept}
          placeholder={placeholder}
          checked={checked}
          color='white'
          value={value}
          onChange={handleInputChange}
          required={required}
          maxLength={maxLength}
          {...props}
          className={
            type !== "password" &&
            `border border-lightGrey bg-lightGrey/30 p-2 rounded-md ${className} placeholder:text-[12px] outline-none focus:outline-none`
          }
        />
      )}
      {errorMessage && (
        <div className='text-[#DC3545] text-sm mt-1 flex items-center gap-1'>
          <span>
            <RiErrorWarningFill />
          </span>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default InputWithFullBorder;
