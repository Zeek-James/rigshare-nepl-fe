// import { LayoutGrid, SquareEqual } from "lucide-react";

import { FaThList } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

export function SwitchWithIcon({ isGridView, setIsGridView }) {
  return (
    <div className='flex items-center p-1 bg-white w-fit'>
      <button
        onClick={() => setIsGridView(false)}
        className={`p-2 rounded-lg transition-all duration-300 h-10 w-10 items-center flex justify-center ${
          !isGridView
            ? "bg-[#F5FFF5] border border-brandPurple text-brandPurple"
            : "bg-transparent text-[#666666]"
        }`}
        aria-label='List View'
      >
        <FaThList className='text-lg' />
      </button>
      <button
        onClick={() => setIsGridView(true)}
        className={`p-2 rounded-lg transition-all duration-300 h-10 w-10 items-center flex justify-center ${
          isGridView
            ? "bg-[#F5FFF5] border border-brandPurple text-brandPurple"
            : "bg-transparent text-[#666666]"
        }`}
        aria-label='Grid View'
      >
        <RxDashboard className='text-lg' />
      </button>
    </div>
  );
}
