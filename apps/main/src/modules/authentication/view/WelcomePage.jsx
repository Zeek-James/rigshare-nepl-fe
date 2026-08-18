import { useNavigate } from "react-router-dom";
import { rigShareLogo } from "../../../assets/images";
import CustomButton from "../../../generalComponents/Button";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { RigShareAuthBg } from "../components/RigShareAuthBg";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();

    navigate("/subscription/plans"); // Redirect to dashboard for login
  };

  return (
    <div className='grid min-h-svh lg:grid-cols-7'>
      <div className='flex flex-col md:flex-row col-span-3'>
        <div className='w-full flex flex-col justify-center items-center bg-white p-8 h-screen'>
          <div className='w-full max-w-[460px] flex flex-col gap-10 h-fit'>
            <div className='w-fit mx-auto'>
              <img
                src={rigShareLogo}
                alt='performance-dialogue Logo'
                className='mb-[5px] mx-auto h-[60px] max-w-[60px] w-auto object-contain'
              />
              <p className='font-semibold text-xl text-[#006600B5]'>
                Rig Share 247
              </p>
            </div>
            <div className='flex justify-center items-center flex-col text-center'>
              <h2 className='font-semibold text-2xl text-[#333333]'>
                Welcome to Rigshare!
              </h2>
              <p className='text-14px px-3'>
                Your account has been approved. An email has been sent to you
                with your login credentials.
              </p>
            </div>

            <div className=''>
              <form onSubmit={handleSubmission}>
                <CustomButton
                  buttonText={"Select subscription plan"}
                  radius={"md"}
                  className='w-full'
                  type='submit'
                />
              </form>
            </div>
          </div>
        </div>
        <ChangePasswordModal />
      </div>
      <RigShareAuthBg />
    </div>
  );
};

export default WelcomePage;
