import { toast } from "react-toastify";

import axios from "axios";
// import useGetCloudinaryKeyManager from "@/constants/cloudinaryEndpoints/getSignedKeyController";
// import useGetSignatureManager from "@/constants/cloudinaryEndpoints/getCloudinarySignatureController";
import {  useState } from "react";
import AxiosWithToken from "../constants/api_management/MyHttpHelperWithToken";

const useFileUploadManager = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const uploadToCloudinary = async (file, fileType) => {
    const [signature] = [
      await AxiosWithToken.get(
        `/modules/files/upload/signature?resource_type=${fileType}&resource_name=${file?.name}`
      ),
    ];
    console.log(signature.data);
    if (signature) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        formData.append("api_secret", process.env.CLOUDINARY_API_SECRET);
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        formData.append("timestamp", signature?.data?.data?.timestamp);
        formData.append("signature", signature?.data?.data?.signature);
        console.log("Signature Data:", signature?.data?.data);
        console.log("Timestamp:", signature?.data?.data?.timestamp);
        console.log("Signature:", signature?.data?.data?.signature);

        if (signature && fileType) {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
            formData,
            {
              onUploadProgress: (progressEvent) => {
                console.log(
                  "Upload Progress: " +
                    Math.round(
                      (progressEvent.loaded / progressEvent.total) * 100
                    ) +
                    "%"
                );
                const percentCompleted = Math.round(
                  (progressEvent.loaded / progressEvent.total) * 100
                );
                setProgress(percentCompleted);
              },
            }
          );
          console.log("Image uploaded successfully:", response.data.secure_url);
          setLoading(false);

          return response.data.secure_url;
        }

        // Handle success
      } catch (error) {
        toast.error(error);
        console.error("Error uploading image to Cloudinary:", error);
        setLoading(false);
        // Handle error
      }
    }
  };

  return {
    uploadToCloudinary,
    loading: loading,
    progress,
  };
};

export default useFileUploadManager;
