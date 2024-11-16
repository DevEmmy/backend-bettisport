import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploader = async (data: string, resourceType: "image" | "video" | "raw" | "auto" | undefined = "image") => {
  const result = await cloudinary.uploader.upload(data, { resource_type: resourceType });
  return result.secure_url;
};

export const uploaderListOfMedia = async (arr: any, resourceType:  "image" | "video" | "raw" | "auto" | undefined = "image") => {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(await uploader(arr[i].base64, resourceType));
  }
  return newArr;
};

export default cloudinary;
