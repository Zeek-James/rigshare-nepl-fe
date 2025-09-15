import { useEffect, useState, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { menus } from "../constants/menus";
import { logo, noImage, rigShareLogo } from "../assets/images";
import { MdLocalOffer } from "react-icons/md";
import ButtonWithIcon from "./ButtonWithIcon";
import { BiLogIn, BiSolidDashboard, BiUser, BiWallet } from "react-icons/bi";
import useGetUserDetailsManager from "../modules/settings/controllers/get_UserDetails_controller";
import { getInitials } from "../utils/getInitials";
import CustomButton from "./Button";

const NavBar = ({ isLandingPage = false }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const router = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const { data: userDetails } = useGetUserDetailsManager(isLoggedIn);

  useEffect(() => {
    const index = menus.findIndex((menu) => menu.path === pathname);
    setCurrentIndex(index !== -1 ? index : 0);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const openCloseMenu = () => {
    setOpenMenu(!openMenu);
  };

  const getMenuItems = () => {
    const clientType = localStorage.getItem("client_type");
    const isVendor = clientType === "VENDOR";
    const isAdmin = clientType === "admin";

    if (isAdmin) {
      return [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: BiSolidDashboard,
        },
        {
          title: "Profile",
          path: "/vendor/profile",
          icon: BiUser,
        },
        {
          title: "My Bids",
          path: "/vendor/bids",
          icon: MdLocalOffer,
        },
        {
          title: "Transactions",
          path: "/vendor/transactions",
          icon: BiWallet,
        },
      ];
    }

    if (isVendor) {
      return [
        {
          title: "Profile",
          path: "/vendor/profile",
          icon: BiUser,
        },
        {
          title: "My Bids",
          path: "/vendor/bids",
          icon: MdLocalOffer,
        },
        {
          title: "Transactions",
          path: "/vendor/transactions",
          icon: BiWallet,
        },
      ];
    }

    return [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: BiSolidDashboard,
      },
    ];
  };

  const menuItems = getMenuItems();

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
  };

  const handleMenuItemClick = (path) => {
    router(path);
    setShowProfileMenu(false);
  };

  // Replace ProfileButton component with this JSX directly in the return statement where it's used:
  const profileMenu = (
    <div className='relative' ref={profileRef}>
      <button
        onClick={handleProfileClick}
        className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50'
      >
        <div className='w-10 h-10 rounded-full border-2 border-brandPurple flex items-center justify-center bg-[#EDF6E6]'>
          <span className='text-sm font-medium'>
            {(
              <img
                className=' object-cover h-[44px] w-[44px] p-[0.7px] rounded-full '
                src={
                  // data?.data?.user?.profile_picture !== ""
                  userDetails?.data?.user?.profile_image_url
                }
                alt='user avatar'
              />
            ) || userDetails?.data?.user?.first_name
              ? getInitials(
                  `${userDetails?.data?.user?.first_name} ${userDetails?.data?.user?.last_name}`
                )
              : noImage}
          </span>
        </div>
        <div className='flex flex-col items-start'>
          <span className='font-medium text-sm text-brandPurple'>
            {userDetails?.data?.user?.first_name}{" "}
            {userDetails?.data?.user?.last_name}
          </span>
          <span className='text-gray-500 text-xs'>
            {userDetails?.data?.user?.email}
          </span>
        </div>
      </button>

      {showProfileMenu && (
        <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 border z-50'>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleMenuItemClick(item.path)}
                className='flex items-center w-full gap-3 px-4 py-2 hover:bg-gray-100 text-gray-700'
              >
                <Icon className='w-5 h-5' />
                <span>{item.title}</span>
              </button>
            );
          })}
          <button
            onClick={() => {
              localStorage.clear();
              router("/login");
            }}
            className='flex items-center w-full gap-3 px-4 py-2 hover:bg-gray-100 text-red-600 border-t mt-1'
          >
            <BiLogIn className='w-5 h-5' />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );

  // Add this before the profileMenu in the return:
  const cartMenu = <div className='flex items-center mr-4'></div>;

  return (
    <div className='sticky top-0 bg-white z-50 flex lg:px-5 lg:justify-between lg:border border-b-[#E0E0E0] border-transparent py-3 px-5 items-center lg:mx-auto lg:my-0 text-black'>
      <Link to={isLandingPage ? "/" : "/"}>
        <div className='hidden lg:flex mr-2 items-center z-40 gap-[5px]'>
          <img
            src={rigShareLogo}
            alt='Rig share Logo'
            className='h-[40px] max-w-[40px] w-auto object-contain'
          />
          <p className='font-semibold text-[13px] text-[#006600B5]'>
            {isLandingPage ? "RightClick" : "Rig Share 247"}
          </p>
        </div>
      </Link>

      {/* Equipment Browsing Navigation (for unauthenticated users) */}
      {!isLoggedIn && !isLandingPage && (
        <div className='flex items-center space-x-4'>
          <button className='flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium'>
            <span className='text-lg'>☰</span>
            <span>Category</span>
          </button>
          <div className='flex-1 max-w-md'>
            <input
              type='text'
              placeholder='Search by name, type, or location'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
            />
          </div>
        </div>
      )}

      {/* Landing Page Navigation Links */}
      {isLandingPage && (
        <div className='hidden lg:flex items-center space-x-8'>
          <a
            href='/'
            className='text-gray-700 hover:text-purple-600 font-medium transition-colors'
          >
            Home
          </a>
          <a
            href='#features'
            className='text-gray-700 hover:text-purple-600 font-medium transition-colors'
          >
            Features
          </a>
          <a
            href='#about'
            className='text-gray-700 hover:text-purple-600 font-medium transition-colors'
          >
            About Us
          </a>
          <a
            href='/contact-us'
            className='text-gray-700 hover:text-purple-600 font-medium transition-colors'
          >
            Contact Us
          </a>
        </div>
      )}

      {/* Auth/Profile Section */}
      {isLoggedIn && !isLandingPage ? (
        <div className='flex items-center'>
          {cartMenu}
          {profileMenu}
        </div>
      ) : (
        <div className='flex gap-3'>
          <CustomButton
            buttonText={isLandingPage ? "Sign In" : "Sign Up"}
            buttonColor={"bg-white"}
            className={
              isLandingPage
                ? "border border-gray-300 rounded-xl px-6 py-2"
                : "border border-brandPurple rounded-xl"
            }
            textColor={isLandingPage ? "text-gray-700" : "text-brandPurple"}
            onClick={() => router("/login")}
          />
          <CustomButton
            buttonText={isLandingPage ? "Sign Up" : "Log In"}
            buttonColor={isLandingPage ? "bg-purple-700" : "bg-white"}
            className={
              isLandingPage
                ? "rounded-xl px-6 py-2"
                : "border border-brandPurple rounded-xl"
            }
            textColor={isLandingPage ? "text-white" : "text-brandPurple"}
            onClick={() => router(isLandingPage ? "/sign-up" : "/login")}
          />
        </div>
      )}

      {/* mobile menu */}
      <div className='fixed px-5 lg:hidden right-0 z-50 bg-white top-0 py-3 flex items-center justify-between w-full'>
        <Link to={"/"}>
          <div className='mr-2 items-center z-40'>
            <img src={rigShareLogo} alt='logo' className='h-[30px] w-auto' />
          </div>
        </Link>
        <div className='md:text-[30px] text-black' onClick={openCloseMenu}>
          {openMenu ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      <ul
        className={`fixed lg:hidden ${
          openMenu ? "left-0" : "left-[-100%]"
        } top-0 pt-8 pl-8 pr-8 bg-white h-full w-[70%] md:w-[40%] flex flex-col text-[16px] font-normal font-dm-sans space-y-8 items-left ease-in-out duration-500 z-50`}
      >
        <Link to={"/"}>
          <div className='flex mr-2 items-center'>
            <img src={rigShareLogo} alt='logo' className='h-[50px]' />
          </div>
        </Link>
        {/* <ul>
          {menus
            .filter((item) => item.title !== "Appointments")
            .map((menu, index) => (
              <li
                className={
                  !menu.forTop
                    ? "hidden"
                    : menu.isHighlighted
                    ? "border border-lemonGreen px-5 py-2 my-2 max-w-max bg-brandPurple text-white rounded-md"
                    : index === currentIndex
                    ? `border border-b-lemonGreen border-transparent border-b-[2px] max-w-max my-4`
                    : "my-4"
                }
                key={index}
              >
                <button
                  onClick={() => {
                    router(menu.path);
                    setCurrentIndex(index);
                    setOpenMenu(false);
                  }}
                >
                  {menu.title}
                </button>
              </li>
            ))}
        </ul> */}

        {isLoggedIn ? (
          <div className='flex items-center'>
            {cartMenu}
            {profileMenu}
          </div>
        ) : (
          <div className='flex flex-col gap-3'>
            {" "}
            <CustomButton
              buttonText={"Sign Up"}
              className={"border border-brandPurple rounded-xl"}
              onClick={() => router("/login")}
            />
            <CustomButton
              buttonText={"Log In"}
              buttonColor={"bg-white"}
              className={"border border-brandPurple rounded-xl"}
              textColor={"text-brandPurple"}
              onClick={() => router("/login")}
            />
          </div>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
