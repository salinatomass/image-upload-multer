const path = require("path");
const multer = require("multer");
const { v4: uuid } = require("uuid");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname).toLowerCase());
  },
});

const upload = multer({
  storage,
  dest: path.join(__dirname, "../public/uploads"),
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimetype && extname) return cb(null, true);
    cb("Error: The file must be a valid image");
  },
}).single("image");

module.exports = upload;
