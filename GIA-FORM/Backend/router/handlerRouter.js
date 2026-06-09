// const express = require("express");
// const uploadfile = require("../middlewares/s3bucket");

// const multer = require("multer");
// const authController = require("../controllers/vendors/authController");

// const upload = multer({ storage: multer.memoryStorage() });

// const router = express.Router();
// router.post("/upload/file", upload.single("image"), async (req, res) => {
//   let url = await uploadfile(req);
//   res.status(200).send({ url: url });
// });

// module.exports = router;

const express = require("express");
const multer = require("multer");
const uploadfile = require("../middlewares/s3bucket");

const router = express.Router();

// Multer config to accept both images and PDFs
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and PDF files are allowed"), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
});

router.post("/upload/file", upload.single("file"), async (req, res) => {
  try {
    const url = await uploadfile(req);
    res.status(200).send({ url: url });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
