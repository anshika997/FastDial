const express = require("express");
const multer = require("multer");

const authController = require("../controllers/admin/authController");
const dataController = require("../controllers/admin/admindataController");
const { body, validationResult } = require("express-validator");
//const admindataController = require("../controllers/admin/admindataController");

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

//auth endpoints
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

router.get("/data/getformData", dataController.getformData);

router.post("/data/insertformData", dataController.insertformData);

//GIA forms & response
router.get("/data/getForms", dataController.getForms);

router.post("/data/insertFormsResponses", dataController.insertFormsResponses);

// router.use(authController.protect);
//Admin dashboard and data endpoints

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

router.post("/data/insertServices", dataController.insertServices);

router.post("/data/updateServices", dataController.updateServices);

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

//Vendors
router.get("/data/getVendors", dataController.getVendors);

//Forms
router.post("/data/insertForms", dataController.insertForms);
router.post("/data/updateForms", dataController.updateForms);
router.post("/data/deleteForms", dataController.deleteForms);

router.get("/data/getform_groups", dataController.getform_groups);
router.post("/data/insertform_groups", dataController.insertform_groups);
router.put("/data/updateform_groups", dataController.updateform_groups);
router.delete("/data/deleteform_groups/:id", dataController.deleteform_groups);
//Form responses
router.get("/data/getFormsResponses", dataController.getFormsResponses);
router.delete(
  "/data/deleteFormsResponses/:id",
  dataController.deleteFormsResponses
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

// testomonial....
router.get("/data/gettestimonial", dataController.gettestimonial);
router.post("/data/inserttestimonial", dataController.inserttestimonial);
router.post("/data/updatetestimonial", dataController.updatetestimonial);
router.delete("/data/deletetestimonial/:id", dataController.deletetestimonial);

module.exports = router;
