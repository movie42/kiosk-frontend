import React, { useState } from "react";
import ReactS3Client from "react-aws-s3-typescript";
import { v1 } from "uuid";

interface IuseImageUploadProps {}

const useImageUpload = () => {
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const accessKeyId = process.env.REACT_APP_AWS_ID as string;
    const secretAccessKey = process.env.REACT_APP_AWS_KEY as string;
    const bucketName = process.env.REACT_APP_AWS_BUCKET as string;
    const region = process.env.REACT_APP_AWS_REGION as string;
    const s3Config = {
      bucketName,
      region,
      dirName: "products",
      accessKeyId,
      secretAccessKey,
    };

    const s3 = new ReactS3Client(s3Config);

    if (e.target.files) {
      const [file] = e.target.files;
      const filename = `${v1().toString().replace("-", "")}`;
      try {
        const response = await s3.uploadFile(file, filename);

        if (response.status >= 400) {
          throw new Error("사진을 업로드할 수 없습니다.");
        }
        setLocation(response.location);
      } catch (error) {
        const errorMessage = error as string;
        setError(errorMessage);
      }
    }
  };

  return { error, location, uploadFile };
};

export default useImageUpload;
