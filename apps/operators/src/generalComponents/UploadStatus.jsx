import React, { useEffect, useRef, useState } from "react";
import { centrifugoService } from "../constants/CentrifugoService";
import ModalManagement from "./ModalManagement";
import CustomButton from "./Button";
import useGetUserDetailsManager from "../modules/settings/controllers/get_UserDetails_controller";

const UploadStatusModal = ({ batchId }) => {
  const [uploadStatus, setUploadStatus] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [uploadData, setUploadData] = useState({
    total: 0,
    success: 0,
    failed: 0,
  });

  const { data } = useGetUserDetailsManager();

  const userId = data?.data?.user?.id;

  const formatErrorMessages = (errorMessages) => {
    if (!errorMessages || !Array.isArray(errorMessages)) return [];

    return errorMessages.flatMap((errorObj) =>
      Object.entries(errorObj.message).map(([column, errors]) => ({
        row: errorObj.row,
        column,
        error: Array.isArray(errors) ? errors.join(", ") : errors,
      }))
    );
  };

  const batchIdRef = useRef(batchId);

  useEffect(() => {
    batchIdRef.current = batchId;
  }, [batchId]);

  useEffect(() => {
    const initAndSubscribe = async () => {
      await centrifugoService.init();
      const channel = `personal:${userId}`;
      const sub = centrifugoService.subscribe(channel);

      sub?.on("publication", (ctx) => {
        const data = ctx.data;
        if (data?.batch_id === batchIdRef.current) {
          const percentage = data.total_records
            ? Math.round(
                ((data.created_count + data.failed_count) /
                  data.total_records) *
                  100
              )
            : 0;

          setUploadStatus(percentage);
          setUploadData({
            total: data.total_records || 0,
            success: data.created_count || 0,
            failed: data.failed_count || 0,
          });

          if (data.failed_count > 0 && data.error_messages) {
            setUploadError(formatErrorMessages(data.error_messages));
          }
        }
      });

      return () => sub?.unsubscribe();
    };

    initAndSubscribe();
  }, [userId]);

  return (
    <ModalManagement id='upload_status' title='Upload Status'>
      <div className='w-[473px] p-6'>
        <div className='flex flex-col items-center'>
          <div
            className='radial-progress text-[#0281b8] text-xl font-semibold mb-4 progress-lg'
            style={{ "--value": uploadStatus, "--size": "8rem" }}
            role='progressbar'
          >
            {uploadStatus}%
          </div>

          <div className='grid grid-cols-3 gap-4 w-full mb-6'>
            <div className='text-center'>
              <p className='text-gray-600'>Total</p>
              <p className='font-bold'>{uploadData.total}</p>
            </div>
            <div className='text-center'>
              <p className='text-green-600'>Success</p>
              <p className='font-bold'>{uploadData.success}</p>
            </div>
            <div className='text-center'>
              <p className='text-red-600'>Failed</p>
              <p className='font-bold'>{uploadData.failed}</p>
            </div>
          </div>

          {uploadData.failed > 0 && !showError && (
            <CustomButton
              buttonText={`Show ${uploadData.failed} Errors`}
              onClick={() => setShowError(true)}
              className='bg-red-50 text-red-600 border border-red-200 mb-4'
              textColor={"#FF0000"}
            />
          )}

          {showError && uploadError.length > 0 && (
            <div className='text-red-500 p-2 bg-red-50 rounded mb-4 w-full'>
              <div className='flex justify-between mb-2'>
                <p className='font-medium'>Upload Errors:</p>
                <button
                  onClick={() => setShowError(false)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  Close
                </button>
              </div>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr>
                    <th className='border p-2'>Row</th>
                    <th className='border p-2'>Column</th>
                    <th className='border p-2'>Error</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadError?.map((error, index) => (
                    <tr key={index}>
                      <td className='border p-2'>{error.row}</td>
                      <td className='border p-2'>{error.column}</td>
                      <td className='border p-2'>{error.error}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <CustomButton
            buttonText='Close'
            onClick={() => document.getElementById("upload_status").close()}
            className='bg-brandPurple text-white'
          />
        </div>
      </div>
    </ModalManagement>
  );
};

export default UploadStatusModal;
