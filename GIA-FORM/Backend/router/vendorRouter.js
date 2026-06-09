const express = require("express");
const multer = require("multer");
const authController = require("../controllers/vendors/authController");
const dataController = require("../controllers/vendors/vendorsDataController");
const { body, validationResult } = require("express-validator");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post(
  "/login/request",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password is too short").isLength({ min: 8 }),
  ],
  authController.loginRequest
);
router.post("/login/verify", authController.loginVerify);
router.post(
  "/login/signUp",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password is too short").isLength({ min: 8 }),
  ],
  authController.signUp
);
router.get("/logout", authController.logout);

// protect middleware
router.use(authController.protect);

//Affidavits Requests
router.get("/data/getAffidavitRequests", dataController.getAffidavitRequests);

router.post(
  "/data/updateAffidavitsRequest",
  dataController.updateAffidavitsRequest
);

//Gst Registration Company
router.get(
  "/data/getGstRegistrationCompany",
  dataController.getGstRegistrationCompany
);

router.post(
  "/data/updateGstRegistrationCompany",
  dataController.updateGstRegistrationCompany
);

//Services Endpoints
router.get("/data/getServices", dataController.getGstRegistrationCompany);

//GST registration properietorship
router.get(
  "/data/getGstRegistrationproprietorship",
  dataController.getGstRegistrationproprietorship
);

router.post(
  "/data/updateGstRegistrationproprietorship",
  dataController.updateGstRegistrationproprietorship
);

//GST registration partnership
router.get(
  "/data/getGstRegistrationpartnership",
  dataController.getGstRegistrationpartnership
);

router.post(
  "/data/updateGstRegistrationpartnership",
  dataController.updateGstRegistrationpartnership
);

//Property Registration
router.get(
  "/data/getPropertyRegistrationRequests",
  dataController.getPropertyRegistrationRequests
);

router.post(
  "/data/updatePropertyRegistrationRequests",
  dataController.updatePropertyRegistrationRequests
);

//Rental Agreement
router.get("/data/getRentalAgreements", dataController.getRentalAgreements);

router.post(
  "/data/updateRentalAgreements",
  dataController.updateRentalAgreements
);

module.exports = router;
