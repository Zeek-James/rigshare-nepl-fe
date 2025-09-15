import { useState } from "react";
import Section from "../../../generalComponents/CustomSection";
import { SwitchWithIcon } from "../../../generalComponents/SwitchWithIcon";
import CustomButton from "../../../generalComponents/Button";
import CustomFilter from "../../../generalComponents/CustomFilter";
import { EquipmentList } from "../components/EquipmentList";
import { EquipmentGridView } from "../components/EquipmentGridView";
import DataUploadModal from "../../../generalComponents/DataUploadModal";
import CreateWellProgramModal from "../components/CreateWellProgramModal";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import NavBar from "../../../generalComponents/NavBar";
import DashboardCard from "../../../generalComponents/DashboardCard";
import {
  inventoryIcon,
  marketplaceIcon,
  borrowIncomingCardIcon,
  transactionsIcon,
} from "../../../assets/icons";

const HomePage = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [selected, setSelected] = useState(null);

  // Check if user is authenticated
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // Dashboard metrics data
  const dashboardMetrics = [
    {
      cardTitle: "My Equipment",
      cardIcon: inventoryIcon,
      cardDetails: [{ count: "12", label: "Items" }],
    },
    {
      cardTitle: "Available for Lease",
      cardIcon: marketplaceIcon,
      cardDetails: [{ count: "7", label: "Items" }],
    },
    {
      cardTitle: "Active Leases",
      cardIcon: transactionsIcon,
      cardDetails: [{ count: "3", label: "Leases" }],
    },
    {
      cardTitle: "Incoming Lease Requests",
      cardIcon: borrowIncomingCardIcon,
      cardDetails: [{ count: "2", label: "Requests" }],
    },
  ];

  // Equipment browsing content (same for both authenticated and unauthenticated)
  const equipmentContent = (
    <Section
      title={
        isLoggedIn
          ? "Welcome back, Ahmed!"
          : "Welcome! Find the right oil & gas equipment"
      }
      subTitle={
        isLoggedIn
          ? "Let's help you find, manage, or share equipment faster today."
          : "Browse available equipment from leading operators"
      }
      rightContent={
        <div className='flex gap-2'>
          <CustomButton
            buttonText={"Upload Well Program"}
            buttonColor={isLoggedIn ? "bg-brandPurple" : "bg-white"}
            className={isLoggedIn ? "text-white" : "border border-brandPurple"}
            textColor={isLoggedIn ? "text-white" : "text-brandPurple"}
            onClick={() => {
              document.getElementById("well_program_upload").showModal();
            }}
          />
          <CustomButton
            buttonText={"Create Well Program"}
            buttonColor={"bg-white"}
            className={"border border-brandPurple"}
            textColor={"text-brandPurple"}
            onClick={() => {
              setSelected(null);
              document.getElementById("add_well_program").showModal();
            }}
          />
        </div>
      }
    >
      {/* Dashboard Metrics Cards */}
      {isLoggedIn && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
          {dashboardMetrics.map((metric, index) => (
            <DashboardCard
              key={index}
              cardDetails={metric.cardDetails}
              cardTitle={metric.cardTitle}
              cardIcon={metric.cardIcon}
            />
          ))}
        </div>
      )}
      <div className='flex flex-col gap-6'>
        <div className='flex w-full justify-between items-center'>
          <div className='flex gap-3'>
            <CustomButton
              buttonText={"Available Now"}
              textColor={"text-[#344054]"}
              className='bg-white border border-[#A0A0A0]'
              buttonColor={"bg-white"}
              onClick={() => {}}
            />
            <CustomButton
              buttonText={"Near Me"}
              textColor={"text-[#344054]"}
              className='bg-white border border-[#A0A0A0]'
              buttonColor={"bg-white"}
              onClick={() => {}}
            />
            <CustomButton
              buttonText={"Top Rated"}
              textColor={"text-[#344054]"}
              className='bg-white border border-[#A0A0A0]'
              buttonColor={"bg-white"}
              onClick={() => {}}
            />
          </div>
          <SwitchWithIcon
            isGridView={isGridView}
            setIsGridView={setIsGridView}
          />
        </div>
        <div className='flex gap-6'>
          <CustomFilter />
          {!isGridView ? <EquipmentList /> : <EquipmentGridView />}
        </div>
      </div>
    </Section>
  );

  return (
    <>
      {isLoggedIn ? (
        // Authenticated: Show with dashboard navigation
        <BaseDashboardNavigation title={"Dashboard"}>
          <div className='flex flex-col gap-6'>
            {/* Equipment Content */}
            {equipmentContent}
          </div>
        </BaseDashboardNavigation>
      ) : (
        // Unauthenticated: Show with public navbar
        <div className='min-h-screen bg-white'>
          <NavBar />
          <div className='pt-4'>{equipmentContent}</div>
        </div>
      )}

      {/* Modals for both authenticated and unauthenticated users */}
      <DataUploadModal
        modalId={"well_program_upload"}
        title={"Upload Well Program"}
      />
      <CreateWellProgramModal details={selected} />
    </>
  );
};

export default HomePage;
