import { useParams } from "react-router-dom";
import NavBar from "../../../generalComponents/NavBar";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import Section from "../../../generalComponents/CustomSection";
import { Carousel } from "../../../generalComponents/Carousel";
import { InfoCard } from "../components/InfoCard";
import { ComplianceDocuments } from "../components/ComplianceDocuments";
import { TechnicalSpecification } from "../components/TechnicalSpecification";
import { AvailabilitySchedule } from "../components/AvailabilitySchedule";
import Tabs from "../../../generalComponents/Tabs";

const EquipmentDetailsPage = () => {
  const { id } = useParams();
  console.log({ id });

  // Mock equipment data - in real app this would come from API
  const equipment = {
    name: "Hydraulic Drilling Rig HD-3000",
    status: "Available",
    manufacturer: "Schlumberger",
    modelNumber: "HD-3000",
    yearOfManufacture: "2019",
    category: "Drilling Equipment",
    owner: "Chevron Nigeria Ltd",
    location: "Port Harcourt, Nigeria",
    lastMaintenanceDate: "February 10, 2024",
    complianceStatus: "Verified",
    images: [
      "/api/placeholder/400/400", // Main image
      "/api/placeholder/120/120", // Thumbnail 1
      "/api/placeholder/120/120", // Thumbnail 2
      "/api/placeholder/120/120", // Thumbnail 3
      "/api/placeholder/120/120", // Thumbnail 4
    ],
    technicalSpecs: {
      rigName: "Contractor A",
      rigType: "Submersible",
      rigLocation: "Abis",
      waterDepth: "4000",
      loadCapacity: "4000 kips",
      longitude: "53.430",
      noOfEngines: "43",
      noOfPumps: "93",
      topDriveHP: "920",
      drillPipe: "5-132",
      mudTank: "1000 bbl",
      latitude: "63.382",
      mast: "150 m",
      drawWorks: "16s",
      accommodation: "43 man",
      bop: "10k",
      scr: "8000",
      shareRate: "$19800/km",
    },
    complianceDocuments: [
      { name: "NCDMB Compliance Certificate", status: "uploaded" },
      { name: "Spec Sheet", status: "uploaded" },
      { name: "Inspection Report", status: "missing" },
      { name: "Asset Ownership Proof", status: "uploaded" },
      { name: "Equipment Integrity Report", status: "missing" },
      { name: "Maintenance History", status: "uploaded" },
    ],
    availabilitySchedule: [
      {
        period: "May 1 - May 9",
        leaseTracker: "-",
        bookedBy: "-",
        notes: "May 2023",
        status: "Available",
      },
      {
        period: "May 10 - May 28",
        leaseTracker: "30%",
        bookedBy: "Shell",
        notes: "May 2023",
        status: "In Use",
      },
      {
        period: "May 29 - June 2",
        leaseTracker: "60%",
        bookedBy: "Internal",
        notes: "May 2023",
        status: "Under Maintenance",
      },
      {
        period: "June 3 - Sep 27",
        leaseTracker: "-",
        bookedBy: "-",
        notes: "May 2023",
        status: "Available",
      },
    ],
  };

  const tabsData = [
    { label: "Availability Schedule", component: <AvailabilitySchedule /> },
    {
      label: "Technical Specification",
      component: <TechnicalSpecification equipment={equipment} />,
    },
    {
      label: "Compliance Documents",
      component: <ComplianceDocuments equipment={equipment} />,
    },
  ];
  // Check if user is authenticated
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLeaseEquipment = () => {
    if (!isLoggedIn) {
      // Show auth gate modal
      document.getElementById("auth_gate_modal").showModal();
    } else {
      // Proceed to lease process
      console.log("Proceeding to lease equipment:", equipment.name);
    }
  };

  const content = (
    // <div className='max-w-6xl mx-auto p-6'>
    <div className='flex flex-col gap-16'>
      {/* Equipment Header */}
      <Section>
        <div className='flex gap-6 mt-6'>
          <div className='flex-1 bg-white'>
            <Carousel />
          </div>
          <div className='flex-1 bg-white rounded-3xl'>
            <InfoCard handleLeaseEquipment={handleLeaseEquipment} />
          </div>
        </div>
      </Section>
      <Section>
        <Tabs tabsData={tabsData} />
      </Section>
    </div>
  );

  return (
    <>
      {isLoggedIn ? (
        <BaseDashboardNavigation title='Equipment Details'>
          {content}
        </BaseDashboardNavigation>
      ) : (
        <div className='min-h-screen bg-white'>
          <NavBar />
          <div className='pt-4'>{content}</div>
        </div>
      )}

      {/* Auth Gate Modal */}
      <dialog id='auth_gate_modal' className='modal'>
        <div className='modal-box max-w-md'>
          <h3 className='font-bold text-lg mb-4'>You're Almost There!</h3>
          <p className='text-gray-600 mb-6'>
            To lease equipment, please log in or create an account. It only
            takes a minute!
          </p>
          <div className='flex flex-col gap-3'>
            <button
              onClick={() => (window.location.href = "/sign-up")}
              className='btn bg-blue-600 text-white hover:bg-blue-700'
            >
              Sign Up
            </button>
            <button
              onClick={() => (window.location.href = "/login")}
              className='btn btn-outline'
            >
              Log In
            </button>
            <button
              onClick={() => document.getElementById("auth_gate_modal").close()}
              className='btn btn-ghost'
            >
              Cancel
            </button>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default EquipmentDetailsPage;
