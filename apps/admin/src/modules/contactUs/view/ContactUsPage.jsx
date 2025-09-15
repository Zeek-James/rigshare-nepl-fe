import React from "react";
import HeaderFooter from "../../../generalComponents/HeaderFooter";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import CustomButton from "../../../generalComponents/Button";

const ContactUsPage = () => {
  return (
    <HeaderFooter>
      <div className='w-[90vw] flex md:flex-row flex-col max-w-[1240px] md:mx-auto mx-4 relative my-20 gap-10'>
        <div className='w-full md:h-[623px] max-w-[481px] mx-auto'>
          <div className='flex flex-col w-full mb-10'>
            <h5 className='font-clash text-brandPurple font-medium text-[24px] leading-[1.2] mb-4 '>
              Questions and Enquiries?
            </h5>{" "}
            <h1 className='font-clash font-medium text-[56px] leading-[1.2] my-4 '>
              Contact Us
            </h1>{" "}
            <p className='font-instrument font-regular text-16px text-black  mb-12 max-w-3xl mx-auto'>
              Fill out the form and our team will get back to you shortly to
              discuss how we can support your growth and success. For more
              inquiries, reach us at customersupport@nipex.com.ng.
            </p>
          </div>
        </div>
        <div className='w-full max-w-[568px] relative flex flex-col'>
          <div className='w-full flex flex-col'>
            <div className='flex flex-col md:flex-row items-center md:gap-10 gap-0'>
              <div className='w-full'>
                <InputWithFullBoarder
                  placeholder={`Enter your first name`}
                  label={`First Name`}
                />
              </div>
              <div className='w-full'>
                <InputWithFullBoarder
                  placeholder={`Enter your last name`}
                  label={`Last Name`}
                />
              </div>
            </div>
            <InputWithFullBoarder
              placeholder={`Enter your email address`}
              label={`Email address`}
              type={"email"}
            />
            <InputWithFullBoarder
              placeholder={`Enter your question or message`}
              label={`Your message`}
            />
            <CustomButton buttonText={`Submit`} className={`w-full mt-10`} />
          </div>
        </div>
      </div>
    </HeaderFooter>
  );
};

export default ContactUsPage;
