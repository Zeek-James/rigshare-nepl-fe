// App.jsx or your router file
import { useNavigate, useLocation } from "react-router-dom";
import HeaderFooter from "./HeaderFooter";

// VendorLayout.jsx
const VendorLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <HeaderFooter>
      <div className="max-w-[1240px] w-full mx-auto flex">
        <div className="w-64 pt-16 pr-8">
          <div className="space-y-1">
            <button
              className={`w-full text-left p-4 text-[18px] ${
                location.pathname === "/vendor/bids" ? "bg-[#F5F8F5]" : ""
              }`}
              onClick={() => navigate("/vendor/bids")}
            >
              Bids
            </button>
            <button
              className={`w-full text-left p-4 text-[18px] ${
                location.pathname === "/vendor/won" ? "bg-[#F5F8F5]" : ""
              }`}
              onClick={() => navigate("/vendor/won")}
            >
              Won Items
            </button>
            <button
              className={`w-full text-left p-4 text-[18px] ${
                location.pathname === "/vendor/transactions"
                  ? "bg-[#F5F8F5]"
                  : ""
              }`}
              onClick={() => navigate("/vendor/transactions")}
            >
              Transactions
            </button>
            <button
              className={`w-full text-left p-4 text-[18px] ${
                location.pathname === "/vendor/profile" ? "bg-[#F5F8F5]" : ""
              }`}
              onClick={() => navigate("/vendor/profile")}
            >
              Profile
            </button>
          </div>
        </div>
        <div className="flex-1 pt-6">{children}</div>
      </div>
    </HeaderFooter>
  );
};

export default VendorLayout;
