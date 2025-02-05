import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { resource_type: "auto", folder: folder }, 
      (error, result) => {
        if (error) return reject(error);
        resolve({
          public_id: result.public_id,
          url: result.secure_url, 
        });
      }
    );
  });
};

export { uploads, cloudinary };
