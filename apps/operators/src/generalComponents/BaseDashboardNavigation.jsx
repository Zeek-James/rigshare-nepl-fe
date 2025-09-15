import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import IconWithText from "./IconWithText";
import { antanLogo } from "../assets/images";
import { logoutIcon, rigShare_2 } from "../assets/icons";
import { lowerMenu, dashboardMenu } from "../constants/menus";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaBars, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AxiosWithToken from "../constants/api_management/MyHttpHelperWithToken";
import { getInitials } from "../utils/getInitials";
import useGetUserDetailsManager from "../modules/settings/controllers/get_UserDetails_controller";
import { ToastContainer } from "react-toastify";
import useGetPermissionsManager from "../modules/accessControl/roles/controllers/get_permissions_controller";
import { hasPermissions } from "../constants/permissions";
import Loader from "./Loader";
// import useGetNotificationManager from "../modules/notifications/controllers/getNotificationController";

const BaseDashboardNavigation = ({
  children,
  title,
  subtitle,
  onChange,
  value,
  hideSearch,
  breadcrumbs = [],
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const location = useLocation();

  const { data } = useGetUserDetailsManager();

  const {
    data: permissionData,
    isLoading: permissionsLoading,
    isSuccess: permissionsLoaded,
  } = useGetPermissionsManager();

  const handleOpenMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  const toggleSubMenu = (path) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  // Check if clientId exists
  if (!localStorage.getItem("clientId")) {
    localStorage.setItem("clientId", data?.data?.client?.id);
  }

  if (!localStorage.getItem("userId")) {
    localStorage.setItem("userId", data?.data?.user?.id);
  }

  // Updated permissions handling - no reload needed
  useEffect(() => {
    if (permissionsLoaded && permissionData?.data) {
      // Store permissions without causing page reloads
      localStorage.setItem(
        "userPermissions",
        JSON.stringify(permissionData.data)
      );

      // Clear cache to ensure updated permissions are used
      if (window.clearPermissionCache) {
        window.clearPermissionCache();
      }
    }
  }, [permissionData, permissionsLoaded]);
  useEffect(() => {
    dashboardMenu.forEach((item) => {
      if (
        item.subMenu &&
        item.subMenu.some((sub) => location.pathname.startsWith(sub.path))
      ) {
        setOpenSubmenus((prev) => ({ ...prev, [item.path]: true }));
      }
    });
  }, [location.pathname]);

  const renderMenuItems = (menuItems) =>
    menuItems
      // Filter out parent menus with no visible submenu items (or no permission for parent)
      .filter((item) => {
        const hasParentPermission = hasPermissions(item.requiredPermissions);
        const visibleSubMenu = item.subMenu?.some((sub) => {
          return hasPermissions(sub.requiredPermissions);
        });

        // Show menu item if it either:
        // - Has direct permission
        // - OR any of its submenus are allowed
        return hasParentPermission || visibleSubMenu;
      })
      .map((item) => {
        const { path, icon, activeIcon, title, subMenu } = item;
        const isOpen = openSubmenus[path];
        const hasSub = !!subMenu;

        const Wrapper = hasSub ? "div" : Link;
        const wrapperProps = hasSub ? {} : { to: path };

        return (
          <div key={path} className={`${"w-full"}  flex flex-col gap-1`}>
            <Wrapper
              {...wrapperProps}
              className='cursor-pointer flex items-center justify-between mb-2 w-full'
              onClick={hasSub ? () => toggleSubMenu(path) : undefined}
            >
              <IconWithText
                icon={icon}
                activeIcon={activeIcon}
                path={path}
                iconSize={isSidebarCollapsed ? "" : "18px"}
                text={isSidebarCollapsed ? "" : title}
                textVisible={!isSidebarCollapsed}
                hasSub={hasSub}
                className={
                  isSidebarCollapsed
                    ? "rounded-full p-3 mx-auto"
                    : "rounded-lg py-3 px-3 md:px-4 w-full"
                }
              />
              {!isSidebarCollapsed && hasSub && (
                <span
                  className={`ml-auto transition-transform duration-300 ${
                    isOpen ? "rotate-0" : "-rotate-90"
                  }`}
                >
                  <IoMdArrowDropdown className='text-white' />
                </span>
              )}
            </Wrapper>

            {!isSidebarCollapsed && hasSub && (
              <div
                className={`
              overflow-hidden transition-all duration-300 pl-4 ml-2 border-l-2 border-gray-200
              ${isOpen ? "max-h-[500px] mt-1" : "max-h-0"}
            `}
              >
                <div className='flex flex-col gap-1'>
                  {subMenu
                    ?.filter((sub) => hasPermissions(sub.requiredPermissions))
                    .map(({ path: subPath, icon, activeIcon, title }) => (
                      <Link key={subPath} to={subPath}>
                        <IconWithText
                          icon={icon}
                          activeIcon={activeIcon}
                          path={subPath}
                          iconSize='20px'
                          text={title}
                          textVisible
                        />
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        );
      });

  const handleLogout = async () => {
    try {
      // Make the logout request
      await AxiosWithToken.post("/auth/logout");
      // Clear localStorage
      localStorage.clear();

      // Optionally, wait for localStorage to be cleared
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Redirect to login page
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
      // Handle any logout errors if needed
    }
  };

  return (
    <div className='flex h-[100vh] w-full text-blackColor p-0 overflow-hidden'>
      <div
        className={`${
          isSidebarCollapsed ? "w-[70px] p-3" : "w-[250px] p-6"
        } transition-all duration-300 bg-brandPurple z-50 h-full overflow-y-auto scrollbar-hide flex-col items-start justify-between rounded-r-[10px]  border-r ${
          showMenu ? "flex" : "hidden md:flex"
        }`}
      >
        {/* Shank */}
        <div className='flex flex-col items-start w-full'>
          <div className='flex items-center justify-between w-full mb-8'>
            {!isSidebarCollapsed && (
              <Link to={"/"}>
                <div className='hidden lg:flex items-center mr-2 z-40 gap-2'>
                  <img
                    className='object-contain w-10 h-10 hover:cursor-pointer'
                    src={rigShare_2}
                    alt='Rig share Logo'
                  />
                  <p className='font-semibold text-[13px] text-white'>
                    Rig Share 247
                  </p>
                </div>
              </Link>
            )}
            {isSidebarCollapsed && (
              <div className='w-full flex items-center justify-center'>
                <Link to={"/"}>
                  <img
                    className='object-contain w-[40px] h-[40px] hover:cursor-pointer'
                    src={rigShare_2}
                    alt='Rig share Logo'
                  />
                </Link>
              </div>
            )}
            <div
              className={`absolute ${
                isSidebarCollapsed ? "left-14" : "left-[230px]"
              } top-8`}
            >
              <button
                onClick={toggleSidebar}
                className='flex items-center justify-center w-8 h-8 rounded-lg bg-white transition-all duration-200 border border-gray-300 shadow-sm'
              >
                {isSidebarCollapsed ? (
                  <FaChevronRight className='text-gray-600' size={16} />
                ) : (
                  <FaChevronLeft className='text-gray-600' size={16} />
                )}
              </button>
            </div>
          </div>
          {renderMenuItems(dashboardMenu)}
          {/* {permissionsLoading ? <Loader /> : renderMenuItems(dashboardMenu)} */}
        </div>

        {/* Shank */}

        <div
          className={`flex flex-col items-start w-full min-w-[${
            isSidebarCollapsed ? "80px" : "250px"
          }]`}
        >
          {!isSidebarCollapsed &&
            lowerMenu
              .filter((el) =>
                el.requiredPermissions
                  ? hasPermissions(el.requiredPermissions)
                  : true
              )
              .map((el) => (
                <Link
                  key={el.path}
                  className='w-[90%] mx-auto cursor-pointer'
                  to={el?.path}
                >
                  <IconWithText
                    icon={el?.icon}
                    activeIcon={el?.activeIcon}
                    path={el?.path}
                    iconSize='28px'
                    text={isSidebarCollapsed ? "" : el?.title}
                    textVisible={!isSidebarCollapsed}
                  />
                </Link>
              ))}
          {isSidebarCollapsed &&
            lowerMenu
              .filter((el) =>
                el.requiredPermissions
                  ? hasPermissions(el.requiredPermissions)
                  : true
              )
              .map((el) => (
                <Link
                  key={el.path}
                  className='w-full mx-auto cursor-pointer flex justify-center my-2'
                  to={el?.path}
                >
                  <img src={el?.icon} alt={el?.title} className='w-6 h-6' />
                </Link>
              ))}
          {!isSidebarCollapsed && (
            <div className='flex w-[90%] mx-auto cursor-pointer items-center justify-between mt-10'>
              <Link to={"/settings"}>
                <div className='flex gap-2 items-center'>
                  <div className='rounded-full h-[40px] w-[40px] border-brandPrimary border-solid border-2 bg-[#EDF6E6] p-1.5 mr-[7px] cursor-pointer'>
                    <p className='text-16px font-semibold'>
                      {getInitials(
                        `${data?.data?.user?.first_name} ${data?.data?.user?.last_name}`
                      )}
                    </p>
                  </div>
                  <div className='text-12px leading-tight'>
                    <p className='text-12px font-medium text-[#101928]'>
                      {data?.data?.user?.first_name}{" "}
                      {data?.data?.user?.last_name}
                    </p>
                    <p className='text-12px font-normal text-[#344054]'>
                      {data?.data?.user?.email}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )}
          {isSidebarCollapsed && (
            <div className='flex mx-auto cursor-pointer items-center justify-center mt-10'>
              <Link to={"/settings"}>
                <div className='rounded-full h-[40px] w-[40px] border-brandPrimary border-solid border-2 bg-[#EDF6E6] p-1.5 cursor-pointer'>
                  <p className='text-16px font-semibold'>
                    {getInitials(
                      `${data?.data?.user?.first_name} ${data?.data?.user?.last_name}`
                    )}
                  </p>
                </div>
              </Link>
            </div>
          )}
          <div
            className={`${
              isSidebarCollapsed
                ? "w-full flex justify-center"
                : "w-[90%] mx-auto"
            } mt-4 border-t pt-4`}
          >
            <button
              onClick={handleLogout}
              className={`${
                isSidebarCollapsed ? "w-10 h-10 p-2" : "w-full px-4 py-3"
              } flex items-center gap-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors`}
            >
              <img src={logoutIcon} alt='logout' className='w-5 h-5' />
              {!isSidebarCollapsed && (
                <span className='text-14px font-medium'>Sign Out</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed md:hidden ${
          showMenu ? "left-0" : "left-[-100%]"
        } ease-in-out duration-500 w-3/5 bg-lightGrey z-50 h-full pt-4 flex flex-col items-start space-y-10 mr-7 overflow-y-scroll bg-white`}
      >
        <img
          className='object-contain w-[64px] h-[67.98px] mx-7'
          src={antanLogo}
          alt=' logo'
        />
        {permissionsLoading ? <Loader /> : renderMenuItems(dashboardMenu)}
        {permissionsLoading ? <Loader /> : renderMenuItems(lowerMenu)}
      </div>

      {/* Main content area */}
      <div className={`flex-1 h-full overflow-hidden`}>
        <div className='flex flex-col h-full w-full px-4'>
          <div className='flex flex-col md:flex-row items-center justify-between text-left z-40  px-4 py-[10px]'>
            <div className='w-full md:w-auto flex items-center justify-between'>
              <div>
                {/* Breadcrumb navigation */}
                <div className='flex items-center mb-1 text-sm'>
                  {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                      <Link
                        to={item.path}
                        className='text-gray-500 hover:text-gray-700'
                      >
                        {item.label}
                      </Link>
                      {index < breadcrumbs.length - 1 && (
                        <FaChevronRight className='mx-2 text-gray-400 text-xs' />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div
                onClick={handleOpenMenu}
                className='md:hidden bg-white shadow-md p-3.5 h-14 border w-14 rounded-full'
              >
                {showMenu ? (
                  <FaTimes size={25} color='blackColor' />
                ) : (
                  <FaBars size={25} color='blackColor' />
                )}
              </div>
            </div>
            <div className='hidden md:flex justify-end items-center'></div>
          </div>
          <div className='flex-1 overflow-y-auto pb-2 px-0'>
            <div className='py-4 border-b mb-2'>
              <h3 className='text-[20px] font-bold'>{title}</h3>
              {subtitle && <p className='text-sm text-gray-500'>{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BaseDashboardNavigation;
