import DashboardPage from "../modules/dashboard/view/DashboardPage";
import ContactUsPage from "../modules/contactUs/view/ContactUsPage";
import Login from "../modules/authentication/view/Login";
// import NotificationsPage from "../modules/notifications/view/NotificationsPage";
import TicketDetailsPage from "../modules/support/view/TicketDetailsPage";
import SettingsPage from "../modules/settings/view/SettingsPage";
import OTPPage from "../modules/authentication/view/OTPPage";
import ChangePasswordPage from "../modules/authentication/components/ChangePasswordPage";
import ForgotPassword from "../modules/authentication/view/ForgotPassword";
import ResetPassword from "../modules/authentication/view/ResetPassword";
import NotPermittedPage from "../generalComponents/NotPermittedPage";
import CentrifugoTest from "./CentrifugoTest";
import ResetPasswordSuccessful from "../modules/authentication/view/ResetPasswordSuccessful";
import SessionTimeOut from "../modules/authentication/view/SessionTimeOut";
import FirstLoginResetPassword from "../modules/authentication/view/FirstLoginResetPassword";
import SupportPage from "../modules/support/view/SupportPage";
import AuditTables from "../modules/auditLog/view/auditTable";

import SignUp from "../modules/authentication/view/SignUp";
import EmailOTPPage from "../modules/authentication/view/EmailOTPPage";
import WelcomePage from "../modules/authentication/view/WelcomePage";
import SubscriptionPage from "../modules/subscription/view/SubscriptionPage";
import CustomerDetails from "../modules/subscription/view/customerDetails";
import Payments from "../modules/subscription/view/payments";
import PaymentSuccess from "../modules/subscription/view/PaymentSuccess";
import HomePage from "../modules/home/view/HomePage";
import LandingPage from "../modules/home/view/LandingPage";
import EquipmentDetailsPage from "../modules/home/view/EquipmentDetailsPage";
import LeaseManagement from "../modules/leaseManagement/view/LeaseManagement";
import WellsProgram from "../modules/wellsProgram/view/WellsProgram";
import WellProgramDetails from "../modules/wellsProgram/view/WellProgramDetails";
import MyEquipments from "../modules/equipment/view/MyEquipments";
import AvailableEquipments from "../modules/equipment/view/AvailableEquipments";
import MaintenanceDowntime from "../modules/equipment/view/MaintenanceDowntime";
import LeaseRequests from "../modules/lease/view/LeaseRequests";
import ActiveLease from "../modules/lease/view/ActiveLease";
import CompletedLease from "../modules/lease/view/CompletedLease";
import AccessControl from "../modules/accessControl/AccessControl";
import MyUsers from "../modules/userManagement/view/MyUsers";

export const publicRoutes = [
  { path: "/cent", element: <CentrifugoTest /> },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <SignUp /> },

  { path: "/contact-us/", element: <ContactUsPage /> },
  { path: "/otp", element: <OTPPage /> },
  { path: "/email-otp", element: <EmailOTPPage /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/first-password-reset", element: <FirstLoginResetPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/reset-successful", element: <ResetPasswordSuccessful /> },
  { path: "/session-timeout", element: <SessionTimeOut /> },
  { path: "/change-password", element: <ChangePasswordPage /> },
  { path: "/select-subscription", element: <WelcomePage /> },
  { path: "/subscription/plans", element: <SubscriptionPage /> },
  { path: "/subscription/customer-details", element: <CustomerDetails /> },
  { path: "/subscription/payment", element: <Payments /> },
  { path: "/subscription/success", element: <PaymentSuccess /> },

  // Home - Equipment Browsing for Unauthenticated Users
  { path: "/", element: <HomePage /> },
  { path: "/landing", element: <LandingPage /> },
  // { path: "/dashboard", element: <HomePage /> },
  { path: "/equipment/:id", element: <EquipmentDetailsPage /> },
];

export const vendorRoutes = [];

export const protectedRoutes = [
  // { path: "/notifications", element: <NotificationsPage /> },
  { path: "/support", element: <SupportPage /> },
  { path: "/support/ticket/:id", element: <TicketDetailsPage /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "/lease-management", element: <LeaseManagement /> },
  { path: "/wells-program", element: <WellsProgram /> },
  { path: "/wells-program/:id", element: <WellProgramDetails /> },
  { path: "/my-equipments", element: <MyEquipments /> },
  { path: "/available-equipments", element: <AvailableEquipments /> },
  { path: "/maintenance-downtime", element: <MaintenanceDowntime /> },
  { path: "/lease-requests", element: <LeaseRequests /> },
  { path: "/active-lease", element: <ActiveLease /> },
  { path: "/completed-lease", element: <CompletedLease /> },

  //Access control
  {
    path: "/access-control",
    element: <AccessControl />,
    requiredPermissions: ["view_staff", "view_role"],
  },
  {
    path: "/my-users",
    element: <MyUsers />,
  },
  {
    path: "/audit-log",
    element: <AuditTables />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },

  {
    path: "/not-permitted",
    element: <NotPermittedPage />,
  },
];
