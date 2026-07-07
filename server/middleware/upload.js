const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "expense-tracker/receipts",

    allowed_formats: ["jpg", "jpeg", "png", "webp"],

    public_id: (req, file) => {
  const fileName = file.originalname
    .replace(/\s+/g, "-")
    .replace(/[^\w.-]/g, "");

  return `${Date.now()}-${fileName}`;
},
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;