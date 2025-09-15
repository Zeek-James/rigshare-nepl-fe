import {
  actionItemIcon,
  activeHomeIcon,
  auditLog,
  box,
  cashCallIcon,
  dashboardIcon,
  financialChart,
  fluentTarget,
  highlight,
  homeIcon,
  houseIcon,
  inventoryIcon,
  newActiveDashboardIcon,
  newDashboardIcon,
  notificationsIcon,
  peopleIcon,
  reservoirIcon,
  rigsIcon,
  settingsIcon,
  storageTank,
  suiteCaseIcon,
  supportIcon,
  uocIcon,
  userManagementIcons,
  walletMoney,
} from "../assets/icons";

export const menus = [
  // { title: "Home", path: "/", isHighlighted: false, forTop: true },
  // { title: "Categories", path: "#", isHighlighted: false, forTop: true },
  { title: "Home", path: "/", isHighlighted: false, forTop: true },
  { title: "Event", path: "/events", isHighlighted: false, forTop: true },
  {
    title: "Upcoming Event",
    path: "/upcoming-events",
    isHighlighted: false,
    forTop: true,
  },
  // {
  //   title: "New Listing",
  //   path: "/new-listing",
  //   isHighlighted: false,
  //   forTop: true,
  // },
  {
    title: "Contact Us",
    path: "/contact-us",
    isHighlighted: false,
    forTop: true,
  },
  // { title: "Sign In", path: "/login", isHighlighted: true, forTop: true },
];

export const footerMenu = [
  { title: "About", path: "/about-us", isHighlighted: false, forTop: true },
  { title: "Press", path: "/press", isHighlighted: false, forTop: true },
];

export const footerMenu2 = [
  { title: "FAQ", path: "/faq", isHighlighted: false, forTop: true },
  {
    title: "Privacy Policy",
    path: "/privacy-policy",
    isHighlighted: false,
    forTop: true,
  },
  {
    title: "Terms and Conditions",
    path: "/terms-and-conditions",
    isHighlighted: false,
    forTop: true,
  },
];

export const dashboardMenu = [
  {
    title: "Home",
    path: "/",
    icon: homeIcon,
    activeIcon: activeHomeIcon,
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: newDashboardIcon,
    activeIcon: newActiveDashboardIcon,
  },
  {
    title: "Equipment",
    path: "/",
    icon: rigsIcon,
    activeIcon: rigsIcon,
    requiredPermissions: [],
    subMenu: [
      {
        title: "My Equipments",
        path: "/my-equipments",
        icon: reservoirIcon,
        activeIcon: reservoirIcon,
        requiredPermissions: [],
      },
      {
        title: "Available Equipments",
        path: "/available-equipments",
        icon: inventoryIcon,
        activeIcon: inventoryIcon,
        requiredPermissions: [],
      },
      {
        title: "Maintenance & Downtime",
        path: "/maintenance-downtime",
        icon: userManagementIcons,
        activeIcon: userManagementIcons,
        requiredPermissions: [],
      },
    ],
  },
  // {
  //   title: "Core Management",
  //   path: "/user-management",
  //   icon: box,
  //   activeIcon: box,
  //   requiredPermissions: [
  //     "view_role",
  //     "view_user",
  //     "view_operators",
  //     "view_assetgroup",
  //     "view_uap",
  //   ],
  //   subMenu: [
  //     {
  //       title: "User Management",
  //       path: "/user-management",
  //       icon: userManagementIcons,
  //       activeIcon: userManagementIcons,
  //       requiredPermissions: ["view_role", "view_user"],
  //     },
  //     {
  //       title: "Operator",
  //       path: "/operator",
  //       icon: reservoirIcon,
  //       activeIcon: reservoirIcon,
  //       requiredPermissions: ["view_operators"],
  //     },
  //     {
  //       title: "Asset Group Management",
  //       path: "/asset-group-management",
  //       icon: rigsIcon,
  //       activeIcon: rigsIcon,
  //       requiredPermissions: ["view_assetgroup"],
  //     },
  //     {
  //       title: "UAP Code",
  //       path: "/uap-code",
  //       icon: storageTank,
  //       activeIcon: storageTank,
  //       requiredPermissions: ["view_uap"],
  //     },
  //   ],
  // },
  // {
  //   title: "Production",
  //   path: "/production",
  //   icon: peopleIcon,
  //   activeIcon: peopleIcon,
  //   requiredPermissions: [
  //     "view_actualproduction",
  //     "view_annualproduction",
  //     "view_monthlyproduction",
  //   ],
  //   subMenu: [
  //     {
  //       title: "Actual Production",
  //       path: "/production",
  //       icon: walletMoney,
  //       activeIcon: walletMoney,
  //       requiredPermissions: ["view_actualproduction"],
  //     },

  //     {
  //       title: "Target Production",
  //       path: "/production/target",
  //       icon: fluentTarget,
  //       activeIcon: fluentTarget,
  //       requiredPermissions: [
  //         "view_monthlyproduction",
  //         "view_annualproduction",
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "Financial",
  //   path: "/finance",
  //   icon: financialChart,
  //   activeIcon: financialChart,
  //   requiredPermissions: ["view_financial"],
  // },
  // {
  //   title: "Operation",
  //   path: "/operation",
  //   icon: inventoryIcon,
  //   activeIcon: inventoryIcon,
  //   requiredPermissions: ["view_operations"],
  // },
  // {
  //   title: "Facility",
  //   path: "/facility",
  //   icon: houseIcon,
  //   activeIcon: houseIcon,
  //   requiredPermissions: [
  //     "view_jv",
  //     "view_psc",
  //     "view_monthlyfacilitytarget",
  //     "view_annualfacilitytarget",
  //   ],
  //   subMenu: [
  //     {
  //       title: "Actual Facility",
  //       path: "/facility",
  //       icon: walletMoney,
  //       activeIcon: walletMoney,
  //       requiredPermissions: ["view_jv", "view_psc"],
  //     },

  //     {
  //       title: "Target Facility",
  //       path: "/facility/target",
  //       icon: fluentTarget,
  //       activeIcon: fluentTarget,
  //       requiredPermissions: [
  //         "view_monthlyfacilitytarget",
  //         "view_annualfacilitytarget",
  //       ],
  //     },
  //   ],
  // },

  // {
  //   title: "Work Program",
  //   path: "/work-program",
  //   icon: suiteCaseIcon,
  //   activeIcon: suiteCaseIcon,
  //   requiredPermissions: [
  //     "view_workprogram",
  //     "view_monthlyworkprogram",
  //     "view_annualworkprogram",
  //   ],
  //   subMenu: [
  //     {
  //       title: "Actual Work Program",
  //       path: "/work-program",
  //       icon: walletMoney,
  //       activeIcon: walletMoney,
  //       requiredPermissions: ["view_workprogram"],
  //     },

  //     {
  //       title: "Target Work Program",
  //       path: "/work-program/target",
  //       icon: fluentTarget,
  //       activeIcon: fluentTarget,
  //       requiredPermissions: [
  //         "view_monthlyworkprogram",
  //         "view_annualworkprogram",
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "UOC/UDC Cost",
  //   path: "/uoc-udc-cost",
  //   icon: uocIcon,
  //   activeIcon: uocIcon,
  //   requiredPermissions: ["view_uocudccost"],
  // },
  // {
  //   title: "Cash Call",
  //   path: "/cash-call",
  //   icon: cashCallIcon,
  //   activeIcon: cashCallIcon,
  //   requiredPermissions: ["view_cashcall"],
  // },
  // {
  //   title: "Highlight",
  //   path: "/highlight",
  //   icon: highlight,
  //   activeIcon: highlight,
  //   requiredPermissions: ["view_oilhighlight", "view_gashighlight"],
  // },
  // {
  //   title: "Action Items",
  //   path: "/action-items",
  //   icon: actionItemIcon,
  //   activeIcon: actionItemIcon,
  //   requiredPermissions: ["view_actionitem"],
  // },

  {
    title: "Wells Program",
    path: "/wells-program",
    icon: reservoirIcon,
    activeIcon: reservoirIcon,
  },
  {
    title: "Lease",
    path: "/",
    icon: suiteCaseIcon,
    activeIcon: suiteCaseIcon,
    requiredPermissions: [],
    subMenu: [
      {
        title: "Lease Requests",
        path: "/lease-requests",
        icon: peopleIcon,
        activeIcon: peopleIcon,
        requiredPermissions: [],
      },
      {
        title: "Active Lease",
        path: "/active-lease",
        icon: walletMoney,
        activeIcon: walletMoney,
        requiredPermissions: [],
      },
      {
        title: "Completed Lease",
        path: "/completed-lease",
        icon: dashboardIcon,
        activeIcon: dashboardIcon,
        requiredPermissions: [],
      },
    ],
  },
  {
    title: "User Management",
    path: "/",
    icon: peopleIcon,
    activeIcon: peopleIcon,
    requiredPermissions: [],
    subMenu: [
      {
        title: "My Users",
        path: "/my-users",
        icon: userManagementIcons,
        activeIcon: userManagementIcons,
        requiredPermissions: [],
      },
      {
        title: "Role Management",
        path: "/access-control",
        icon: userManagementIcons,
        activeIcon: userManagementIcons,
        requiredPermissions: ["view_staff", "view_role"],
      },
    ],
  },
  {
    title: "Audit Log",
    path: "/audit-log",
    icon: auditLog,
    activeIcon: auditLog,
  },
];

export const lowerMenu = [
  {
    title: "Notifications",
    path: "/notifications",
    icon: notificationsIcon,
    activeIcon: notificationsIcon,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: settingsIcon,
    activeIcon: settingsIcon,
  },
  {
    title: "Support",
    path: "/support",
    icon: supportIcon,
    activeIcon: supportIcon,
  },
];
