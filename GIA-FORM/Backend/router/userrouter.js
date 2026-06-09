const express = require("express");
const multer = require("multer");
const authController = require("../controllers/usrers/authController");
const dataController = require("../controllers/usrers/userDataControllers");
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

router.get("/data/getForms", dataController.getForms);

router.post("/data/insertFormsResponses", dataController.insertFormsResponses);
router.get("/data/getFormsResponses", dataController.getFormsResponses);

// protect middleware
// router.use(authController.protect);

//Affidavits Requests
router.get("/data/getAffidavitRequests", dataController.getAffidavitRequests);

router.post(
  "/data/insertAffidavitsRequest",
  dataController.insertAffidavitsRequest
);

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
  "/data/insertGstRegistrationCompany",
  dataController.insertGstRegistrationCompany
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
  "/data/insertGstRegistrationproprietorship",
  dataController.insertGstRegistrationproprietorship
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
  "/data/insertGstRegistrationpartnership",
  dataController.insertGstRegistrationpartnership
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
  "/data/insertPropertyRegistrationRequests",
  dataController.insertPropertyRegistrationRequests
);

router.post(
  "/data/updatePropertyRegistrationRequests",
  dataController.updatePropertyRegistrationRequests
);

//Rental Agreement
router.get("/data/getRentalAgreements", dataController.getRentalAgreements);

router.post(
  "/data/insertRentalAgreements",
  dataController.insertRentalAgreements
);

router.post(
  "/data/updateRentalAgreements",
  dataController.updateRentalAgreements
);

//GST Registration
router.get("/data/getGstRegistrations", dataController.getGstRegistrations);
router.post(
  "/data/insertGstRegistrations",
  dataController.insertGstRegistrations
);
router.post(
  "/data/updateGstRegistrations",
  dataController.updateGstRegistrations
);
router.delete(
  "/data/deleteGstRegistrations/:id",
  dataController.deleteGstRegistrations
);

//PAN Registrations
router.get("/data/getPanRegistrations", dataController.getPanRegistrations);
router.post(
  "/data/insertPanRegistrations",
  dataController.insertPanRegistrations
);
router.post(
  "/data/updatePanRegistrations",
  dataController.updatePanRegistrations
);
router.delete(
  "/data/deletePanRegistrations/:id",
  dataController.deletePanRegistrations
);

//Tan Registrations
router.get("/data/getTanRegistrations", dataController.getTanRegistrations);
router.post(
  "/data/insertTanRegistrations",
  dataController.insertTanRegistrations
);
router.post(
  "/data/updateTanRegistrations",
  dataController.updateTanRegistrations
);
router.delete(
  "/data/deleteTanRegistrations/:id",
  dataController.deleteTanRegistrations
);

//TDS
router.get("/data/getTdsReturns", dataController.getTdsReturns);
router.post("/data/insertTdsReturns", dataController.insertTdsReturns);
router.post("/data/updateTdsReturns", dataController.updateTdsReturns);
router.delete("/data/deleteTdsReturns/:id", dataController.deleteTdsReturns);

//Legal Notices
router.get("/data/getLegalNotices", dataController.getLegalNotices);
router.post("/data/insertLegalNotices", dataController.insertLegalNotices);
router.post("/data/updateLegalNotices", dataController.updateLegalNotices);
router.delete(
  "/data/deleteLegalNotices/:id",
  dataController.deleteLegalNotices
);

//Sales Aggrement
router.get("/data/getSaleAggrement", dataController.getSaleAggrement);
router.post("/data/insertSaleAggrement", dataController.insertSaleAggrement);
router.post("/data/updateSaleAggrement", dataController.updateSaleAggrement);
router.delete(
  "/data/deleteSaleAggrement/:id",
  dataController.deleteSaleAggrement
);

//Sale deed
router.get("/data/getSaledeed", dataController.getSaledeed);
router.post("/data/insertSaledeed", dataController.insertSaledeed);
router.post("/data/updateSaledeed", dataController.updateSaledeed);
router.delete("/data/deleteSaledeed/:id", dataController.deleteSaledeed);

//Affidafit
router.get("/data/getAffidavid", dataController.getAffidavid);
router.post("/data/insertAffidavid", dataController.insertAffidavid);
router.post("/data/updateAffidavid", dataController.updateAffidavid);
router.delete("/data/deleteAffidavid/:id", dataController.deleteAffidavid);

// items ----------------------------

router.get("/data/getitems", authController.protect, dataController.getitems);
router.post("/data/insertitems", dataController.insertitems);
router.post("/data/updateitems", dataController.updateitems);
router.delete("/data/deleteitems/:item_id", dataController.deleteitems);

// user_favorites ---------------------------------

router.get("/data/getuser_favorites", dataController.getuser_favorites);
router.post("/data/insertuser_favorites", dataController.insertuser_favorites);
router.post("/data/updateuser_favorites", dataController.updateuser_favorites);
router.delete(
  "/data/deleteuser_favorites/:favorite_id",
  dataController.deleteuser_favorites
);

module.exports = router;
