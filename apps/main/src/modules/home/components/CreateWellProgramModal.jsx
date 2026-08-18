import React, { useState, useEffect, useMemo, useRef } from "react";
import ModalManagement from "../../../generalComponents/ModalManagement";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import CustomButton from "../../../generalComponents/Button";
import ButtonWithIcon from "../../../generalComponents/ButtonWithIcon";
import { BiPlus } from "react-icons/bi";
import SelectWithFullBorder from "../../../generalComponents/SelectWithFullBorder";
// import { CreateFinancialDataManager } from "../controllers/createFinancialDataController";
// import { UpdateFinancialDataManager } from "../controllers/updateFinancialDataController";
// import useGetOperatorsManager from "../../production/controllers/getOperatorsController";
import AttachmentUpload from "../../../generalComponents/AttachmentUpload";
import CustomCheckBox from "../../../generalComponents/CustomCheckBox";
import { useNavigate } from "react-router-dom";

const CreateWellProgramModal = ({ details }) => {
  const router = useNavigate();

  // const { createFinancialData, isLoading } = CreateFinancialDataManager();

  // const { updateFinancialData, isLoading: isUpdating } =
  //   UpdateFinancialDataManager({
  //     id: details?.id,
  //   });

  // const { data: companies } = useGetOperatorsManager({
  //   enabled: true,
  // });
  const [companyOptions, setCompanyOptions] = useState([]);

  const modalRef = useRef(null);

  const initialState = {
    companyID: "",
    date: "",
    ebitda: "",
    oil_revenue: "",
    gas_revenue: "",
    cost_oil: "",
    nnpc_profit_oil: "",
    roic: "",
    cir: "",
    royalty: "",
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (details) {
      // Populate form if editing
      setForm({
        companyID: details.company_id || "",
        date: details.date || "",
        ebitda: details.ebitda || "",
        oil_revenue: details.oil_revenue || "",
        gas_revenue: details.gas_revenue || "",
        cost_oil: details.cost_oil || "",
        nnpc_profit_oil: details.nnpc_profit_oil || "",
        roic: details.roic || "",
        cir: details.cir || "",
        royalty: details.royalty || "",
      });
    } else {
      clearFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  //FETCH COMPANIES
  // useEffect(() => {
  //   if (companies?.data?.results) {
  //     const options = companies.data.results.map((company) => ({
  //       value: company.id,
  //       label: company.name,
  //     }));
  //     setCompanyOptions(options);
  //   }
  // }, [companies]);

  const clearFields = () => setForm(initialState);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    const financialData = {
      company: form.companyID,
      date: form.date,
      ebitda: form.ebitda,
      oil_revenue: form.oil_revenue,
      gas_revenue: form.gas_revenue,
      cost_oil: form.cost_oil,
      nnpc_profit_oil: form.nnpc_profit_oil,
      roic: form.roic,
      cir: form.cir,
      royalty: form.royalty,
    };

    if (details) {
      // updateFinancialData(financialData);
      clearFields();
    } else {
      // createFinancialData(financialData);
      clearFields();
    }

    document.getElementById("add_well_program").close(); // Close the main modal
  };

  const isDisabled = useMemo(() => !form.companyID || !form.date, [form]);

  const renderInputPair = (field1, label1, field2, label2) => (
    <div className='flex flex-col md:flex-row md:space-x-[40px] mt-4'>
      <div className='flex-1'>
        <InputWithFullBoarder
          label={label1}
          type='number'
          value={form[field1]}
          onChange={handleChange(field1)}
        />
      </div>
      <div className='flex-1'>
        <InputWithFullBoarder
          label={label2}
          type='number'
          value={form[field2]}
          onChange={handleChange(field2)}
        />
      </div>
    </div>
  );

  return (
    <ModalManagement
      ref={modalRef}
      id='add_well_program'
      title={details ? "Update Well Program" : "Create Well Program"}
      onClose={clearFields}
      className='rounded-[20px] md:max-w-[960px] md:p-[48px]'
      // isLoading={isLoading || isUpdating}
    >
      <div className='h-[500px] overflow-auto relative bg-white flex flex-col pt-6  scrollbar-hide'>
        <div className='flex flex-col md:flex-row md:space-x-[40px]'>
          <div className='flex-1'>
            <InputWithFullBoarder
              className='flex-1'
              label='Program Title'
              type='project_title'
              placeholder={"Enter Program Title"}
            />
          </div>
          <div className='flex-1'>
            <InputWithFullBoarder
              className='flex-1'
              label='Well Name'
              type='well_name'
              placeholder={"Enter Well Name"}
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:space-x-[40px]'>
          <div className='flex-1'>
            <SelectWithFullBorder
              label={"Program Type"}
              selectOptions={companyOptions}
              placeholder={"Select program type"}
              // value={form.companyID}
              // onChange={handleChange("companyID")}
              required
            />
          </div>
          <div className='flex-1'>
            <SelectWithFullBorder
              label={"Program Type Activity"}
              selectOptions={companyOptions}
              placeholder={"Select program activity"}
              // value={form.companyID}
              // onChange={handleChange("companyID")}
              required
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:space-x-[40px]'>
          <div className='flex-1'>
            <SelectWithFullBorder
              label={"Location"}
              selectOptions={companyOptions}
              placeholder={"Select location"}
              required
            />
          </div>
          <div className='flex-1'>
            <SelectWithFullBorder
              label={"Terrain"}
              selectOptions={companyOptions}
              placeholder={"Select terrain"}
              required
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:space-x-[40px]'>
          <div className='flex-1'>
            <SelectWithFullBorder
              label={"Capacity / Performance Requirement"}
              selectOptions={companyOptions}
              placeholder={"Select requirement"}
              required
            />
          </div>
          <div className='flex-1'>
            <InputWithFullBoarder
              className='flex-1'
              label='Water Depth'
              type='well_name'
              placeholder={"Enter a numerical value"}
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:space-x-[40px]'>
          <div className='flex-1'>
            <InputWithFullBoarder
              className='flex-1'
              label='Timeline'
              placeholder='Select timeline'
              type='date'
            />
          </div>
          <div className='flex-1'></div>
        </div>
        <div className='flex flex-col md:flex-row md:space-x-[40px]'>
          <div className='flex-1'>
            <InputWithFullBoarder
              className='flex-1'
              label='Name'
              type='text'
              placeholder={"Enter name"}
            />
          </div>
          <div className='flex-1'>
            <InputWithFullBoarder
              className='flex-1'
              label='Email Address'
              type='email'
              placeholder={"Enter email"}
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:space-x-[40px]'>
          <div className='flex-1'>
            <InputWithFullBoarder
              className='flex-1'
              label='Company Name'
              placeholder='Enter Company'
              type='text'
            />
          </div>
          <div className='flex-1'></div>
        </div>

        <div className={"mt-8 mb-5"}>
          <InputWithFullBoarder
            label={"Program Description"}
            placeholder={"Description"}
            type={"text"}
            isTextArea
            // value={description}
            // onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <AttachmentUpload
          // onFileChange={(e) => {
          //   const file = e.target.files?.[0];
          //   if (file) setAttachment(file);
          // }}
          // fileName={attachment?.name}
          title='Add Supporting Docs (Optional)'
        />

        <div className='flex gap-5 flex-col mb-6'>
          <p className='text-base '>
            We only store your uploads temporarily to generate accurate
            suggestions. For full control and access to equipment lease options,
            please{" "}
            <a
              className='text-brandPurple'
              // onClick={() => router("/sign-up")}
              href='/sign-up'
            >
              Sign Up
            </a>
          </p>
          <div className='flex'>
            <CustomCheckBox
            // text={permission.name}
            // checked={selectedPermissions.includes(permission.id)}
            // onChange={() => handlePermissionChange(permission.id)}
            />
            <p>
              I confirm that all provided details are accurate to the best of my
              knowledge.
            </p>
          </div>
        </div>
        <div className='flex justify-between space-x-2 mt-6 w-full'>
          <ButtonWithIcon
            buttonText={details ? "Update Analysis" : "Submit Program"}
            onClick={handleSubmit}
            className='w-full flex justify-center md:text-[16px] h-[38px]'
            icon={BiPlus}
            // disabled={isDisabled || isLoading || isUpdating}
            // loader={isLoading || isUpdating}
          />
          <CustomButton
            buttonText='Cancel'
            textColor='#344054'
            className='bg-white border border-[#E0E0E0] w-full'
            onClick={() => {
              document.getElementById("add_well_program").close();

              clearFields();
            }}
          />
        </div>
      </div>
    </ModalManagement>
  );
};

export default CreateWellProgramModal;
