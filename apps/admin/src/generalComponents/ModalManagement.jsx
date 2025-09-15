import React from "react";
import Loader from "./Loader";

const ModalManagement = ({
  children,
  id,
  altId,
  type,
  title,
  subtitle,
  className,
  onClose,
  isLoading,
  customHeader,
}) => {
  return (
    <dialog
      id={id}
      className={`modal  ${
        type === "large" ? "max-w-none w-4/5 mx-auto" : "mx-auto"
      }`}
      style={{ position: "fixed" }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`modal-box scrollbar-hide ${className} bg-white ${
            type === "large" ? "max-w-none w-full" : "max-w-max  mx-auto"
          }`}
        >
          <div className='mt-0 flex justify-between w-full scrollbar-hide'>
            <h3 className='md:text-[24px] text-18px font-semibold'>
              {title} <p className='text-[14px] text-[#737473]'>{subtitle}</p>
            </h3>

            <button
              onClick={() => {
                document.getElementById(id).close();
                onClose?.();
              }}
              className='w-[42px] bg-[#EEF7E7] h-[42px] flex justify-center items-center'
            >
              <svg
                width='33'
                height='33'
                viewBox='0 0 33 33'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.15381 8.15234L24.4614 24.46'
                  stroke='#358619'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
                <path
                  d='M8.15381 24.4609L24.4614 8.15332'
                  stroke='#358619'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            </button>
          </div>
          {children}
        </div>
      )}
      <form method='dialog' className='modal-backdrop'>
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default ModalManagement;
