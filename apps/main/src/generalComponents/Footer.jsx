import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets/images";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mx-auto justify-center px-6 lg:px-24 bg-[#181918] text-white pt-6 mt-8 lg:pt-8">
      <div className="mx-auto justify-center items-center py-12">
        {/* First Row with 4 columns */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mt-6 border-t-[#E0E0E0] border-b-2 border-transparent py-5">
          {/* Column 1: Logo and Text */}
          <div className="w-full lg:w-[40%]">
            <div className="mb-4">
              {/* Add your logo image here */}
              <img src={logo} alt="Logo" className="w-28 h-auto" />
            </div>
            <p className="font-instrument text-14px">
              Experience unified, efficient, and transparent material management
              with e-MMS. Our cutting-edge solution provides 360-degree
              visibility into inventory across the oil and gas sector, ensuring
              seamless operations and optimal resource utilisation.
            </p>
          </div>

          {/* Column 2: Menu Title and Links */}
          <div className="w-full lg:w-[25%]">
            <h4 className="font-clash font-medium text-18px mb-4">Company</h4>
            <ul className="font-instrument text-16px space-y-2">
              <li>
                <Link to={"https://nipexmain2.nipex-ng.com/about-us/"}>
                  About
                </Link>
              </li>
              <li>
                <Link to={"/media-coverage"}>Press</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About Title and Links */}
          <div className="w-full lg:w-[25%]">
            <h4 className="font-clash font-medium text-18px mb-4">Support</h4>
            <ul className="font-instrument text-16px space-y-2">
              <li>
                <Link to={"/about-us"}>FAQs</Link>
              </li>
              <li>
                <Link to={"/our-team"}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={"/our-team"}>Terms & Condition</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="w-full lg:w-[30%]">
            <h4 className="font-clash font-medium text-18px mb-4">
              Contact Us
            </h4>

            <p className="font-instrument text-16px">
              Customer Service: 08032850332, 09038452851
            </p>
            <p className="font-instrument text-16px">
              Email:{" "}
              <a href="mailto:info@emms.com" className="text-white">
                customersupport@nipex.com.ng
              </a>
            </p>
            <p className="font-instrument text-16px">
              Address: Address: 27B Oyinkan Abayomi Drive, Ikoyi, Lagos Nigeria
            </p>
          </div>
        </div>

        {/* Divider between rows */}
        <div className="border-t-2 border-gray-400 my-6"></div>

        {/* Second Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full mx-auto font-light text-16px mt-6 py-6">
          {/* Left: Copyright */}
          <p className="font-instrument text-16px text-white">
            © {currentYear} EMMS Inc. All Rights Reserved.
          </p>

          {/* Right: Privacy Policy and Terms & Conditions */}
          <div className="flex gap-6 mt-2 lg:mt-0">
            <Link
              to={"/privacy-policy"}
              className="font-instrument text-16px text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to={"/terms-and-condition"}
              className="font-instrument text-16px text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
