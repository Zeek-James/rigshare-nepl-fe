import React, { useCallback } from "react";
import Select from "react-select";

const MultiSelectInfiniteScroll = ({
  id,
  value,
  onChange,
  label,
  className,
  placeholder,
  selectOptions = [],
  onFocus,
  disabled,
  required,
  loadMore,
  hasMore = false,
  isLoading = false,
  ...props
}) => {
  const handleMenuScrollToBottom = useCallback(() => {
    if (hasMore && !isLoading) {
      loadMore();
    }
  }, [hasMore, isLoading, loadMore]);

  const customStyles = {
    loadingMessage: (base) => ({
      ...base,
      paddingBottom: "6px",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "200px",
    }),
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="text-13px md:text-14px font-medium mb-2" htmlFor={id}>
        {label && (
          <>
            {label}
            {required && <span className="text-red-700 text-[14px]">*</span>}
          </>
        )}
      </label>
      <Select
        id={id}
        value={value}
        onChange={onChange}
        options={selectOptions}
        placeholder={placeholder}
        isMulti
        className={`bg-lightGrey/30 rounded-md ${className} outline-none focus:outline-none`}
        classNamePrefix="react-select"
        onFocus={onFocus}
        isDisabled={disabled}
        onMenuScrollToBottom={handleMenuScrollToBottom}
        isLoading={isLoading}
        styles={customStyles}
        {...props}
      />
    </div>
  );
};

export default MultiSelectInfiniteScroll;
