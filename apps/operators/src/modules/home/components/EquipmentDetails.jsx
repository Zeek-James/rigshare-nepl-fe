import React from "react";
import HeaderFooter from "../../../generalComponents/HeaderFooter";
import Section from "../../../generalComponents/CustomSection";
import { Carousel } from "../../../generalComponents/Carousel";
import { useParams } from "react-router-dom";
import { InfoCard } from "./InfoCard";
import Tabs from "../../../generalComponents/Tabs";
import { ComplianceDocuments } from "./ComplianceDocuments";
import { TechnicalSpecification } from "./TechnicalSpecification";
import { AvailabilitySchedule } from "./AvailabilitySchedule";

export const EquipmentDetails = () => {
  const { id } = useParams(); // gets the dynamic value from the URL
  console.log({ id });
  const tabsData = [
    { label: "Availability Schedule", component: <AvailabilitySchedule /> },
    { label: "Technical Specification", component: <TechnicalSpecification /> },
    { label: "Compliance Documents", component: <ComplianceDocuments /> },
  ];
  return (
    <HeaderFooter>
      <div className='flex flex-col gap-16'>
        <Section>
          <div className='flex gap-6 mt-6'>
            <div className='flex-1 bg-white'>
              <Carousel />
            </div>
            <div className='flex-1 bg-white rounded-3xl'>
              <InfoCard />
            </div>
          </div>
        </Section>
        <Section>
          <Tabs tabsData={tabsData} />
        </Section>
      </div>
    </HeaderFooter>
  );
};
