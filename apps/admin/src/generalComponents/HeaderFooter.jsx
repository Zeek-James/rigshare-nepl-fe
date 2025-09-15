import NavBar from "./NavBar";

import { ToastContainer } from "react-toastify";

const HeaderFooter = ({ children, className }) => {
  return (
    <div className={className ?? "bg-[#F8F8F8]"}>
      <ToastContainer />
      <NavBar />
      {children}
    </div>
  );
};

export default HeaderFooter;
