import { searchIcon } from "../assets/icons";

const SearchField = ({
  value,
  onChange,
  placeholder,
  className,
  width = "w-[280px]",
}) => {
  return (
    <div className='relative'>
      <span className='absolute inset-y-0 left-0 flex items-center justify-center pl-2 '>
        <img src={searchIcon} alt='Search Icon' />
      </span>
      <input
        value={value}
        onChange={onChange}
        type='text'
        placeholder={placeholder ? placeholder : "Search here"}
        className={`input input-bordered pl-8 h-[40px] text-[14px] font-[#8A919E] ${width} max-w-xs  rounded-r-md bg-[#F8F9FA] ${className}`}
        // className={`${className} input input-bordered pl-8 h-[40px] text-[14px] font-[#8A919E] w-[280px] max-w-xs  rounded-r-md bg-[#F8F9FA]`}
      />
    </div>
  );
};

export default SearchField;
