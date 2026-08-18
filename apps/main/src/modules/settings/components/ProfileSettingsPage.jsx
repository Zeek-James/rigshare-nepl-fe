import React, { useEffect, useState } from "react";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import CustomButton from "../../../generalComponents/Button";
import useGetUserDetailsManager from "../controllers/get_UserDetails_controller";
import { UpdateProfileManager } from "../controllers/updateProfileController";
import { noImage } from "../../../assets/images";

const ProfileSettingsPage = () => {
  const { data: userDetails } = useGetUserDetailsManager();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const { updateProfile, isLoading: updating } = UpdateProfileManager();

  const initialData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    dob: null,
    residential_address: "",
    profile_image: "",
  };

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (userDetails?.data) {
      setFormData({
        first_name: userDetails.data.user?.first_name || "",
        last_name: userDetails.data.user?.last_name || "",
        mobile_number: userDetails.data.user?.mobile_number || "",
        dob: userDetails.data.dob
          ? new Date(userDetails.data.dob).toISOString().split("T")[0]
          : null,
        residential_address: userDetails.data.residential_address || "",
        profile_image_url: userDetails.data.profile_image_url || "",
      });
    }
  }, [userDetails]); // Remove formData from dependencies

  // const handleDateChange = (e) => {
  //   setFormData((prev) => ({ ...prev, dob: e.target.value || null }));
  // };

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    const formattedData = {
      ...formData,
      dob: formData.dob ? new Date(formData.dob).toISOString() : null,
      profile_image: imageFile,
    };
    updateProfile(formattedData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the selected image file
      setImageFileName(file.name); // Set the image file name
      setFormData((prev) => ({
        ...prev,
        profile_image_url: URL.createObjectURL(file), // Preview the image
      }));
    }
  };

  return (
    <div className='w-[887px] h-[581px] bg-white rounded-md flex'>
      <div className='flex m-auto'>
        <div className='w-[300px] bg-white items-center justify-center p-8 mt-2 flex flex-col'>
          <div className='flex rounded-full h-[120px] w-[120px] relative justify-center mb-7'>
            <img
              src={userDetails?.data?.user?.profile_image_url || noImage}
              alt='Profile'
              className='h-full w-full rounded-full'
            />
          </div>

          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='hidden'
            id='profileImageInput'
          />
          <CustomButton
            buttonText='Change Photo'
            textColor='brandGreen'
            className='bg-white border border-brandPurple text-brandPurple'
            onClick={() => document.getElementById("profileImageInput").click()}
          />
          {imageFileName && (
            <p className='mt-2 text-gray-500 text-sm'>{imageFileName}</p>
          )}
        </div>
        <div className='md:w-[499px] h-auto rounded-[6px] relative bg-white flex flex-col pt-6'>
          <div className='flex space-x-4'>
            <div className='flex-1'>
              <InputWithFullBoarder
                label='First Name'
                placeholder='Enter First Name'
                value={formData.first_name}
                onChange={handleInputChange("first_name")}
                required
              />
            </div>
            <div className='flex-1'>
              <InputWithFullBoarder
                label='Last Name'
                placeholder='Enter Last Name'
                value={formData.last_name}
                onChange={handleInputChange("last_name")}
                required
              />
            </div>
          </div>
          <div className='flex space-x-4'>
            <div className='flex-1'>
              <InputWithFullBoarder
                label='Phone Number'
                placeholder='Enter phone number'
                value={formData.mobile_number}
                onChange={handleInputChange("mobile_number")}
                required
              />
            </div>
            {/* <div className="flex-1">
              <InputWithFullBoarder
                label="Birthdate"
                type="date"
                placeholder="Enter your birthdate"
                value={formData.dob || ""}
                onChange={handleDateChange}
              />
            </div> */}
          </div>

          {/* <div className="flex space-x-4">
            <div className="flex-1">
              <InputWithFullBoarder
                label="Residential Address"
                placeholder="Enter your address"
                value={formData.residential_address}
                onChange={handleInputChange("residential_address")}
              />
            </div>
          </div> */}
          <div className='flex justify-end space-x-2 mt-4 w-full'>
            <CustomButton
              buttonText='Cancel'
              textColor='#344054'
              className='bg-white border border-gray-600'
            />
            <CustomButton
              buttonText='Update User Details'
              isLoading={updating}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
