import React from "react";

import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import OpenTickets from "./OpenTickets";
import ClosedTickets from "./ClosedTickets";
import Breadcrumb from "../../../generalComponents/BreadCrumb";
import ButtonWithIcon from "../../../generalComponents/ButtonWithIcon";
import { BiPlusCircle } from "react-icons/bi";
import { hasPermissions } from "../../../constants/permissions";
import CreateTicketModals from "../Components/CreateTicketModals";
import Tickets from "./Tickets";

const SupportPage = () => {
  return (
    <BaseDashboardNavigation>
      <div>
        <div className='my-4'>
          <Breadcrumb items={[]} />
        </div>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between w-full'>
          <div className='flex flex-col items-start gap-2 mb-2 md:mb-0'>
            <h3 className='text-[24px] font-bold'>Support Ticket</h3>
            <h3 className='text-[#6C757D] text-[14px]'>
              Submit, track, and manage support tickets for quick issue
              resolution.
            </h3>
          </div>
          <div className='flex items-center space-x-[10px] mt-1 md:mt-0'></div>
        </div>

        <Tickets />
      </div>
      <CreateTicketModals />
    </BaseDashboardNavigation>
  );
};

export default SupportPage;
