const multer = require("multer");
//const path = require("path");

// Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where files will be saved
  },

  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.originalname}`);
  },
});

// File Filter (Allow only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg','image/png','image/jpg'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Multer Upload
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
