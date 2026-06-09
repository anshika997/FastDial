// node and express imports
const { promisify } = require("util");

// local imports
const db = require("../../database/db");
const AppError = require("../../utils/appError");
const catchAsyncError = require("../../utils/catchAsyncError");
const getData = require("../../database/dbquerieshandlers");
const uploadfile = require("../../middlewares/s3bucket");
const {
  generateInsertStatement,
  generateUpdateStatement,
} = require("../../database/sqlStatementGenarator");

//Affidavits Requests
exports.getAffidavitRequests = catchAsyncError(async (req, res, next) => {
  getData(req, res, "affidavit_requests");
});

exports.updateAffidavitsRequest = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("affidavit_requests", req, "request_id");
  res.status(200).send({ message: "Request submitted" });
});

//Gst Registration Company
exports.getGstRegistrationCompany = catchAsyncError(async (req, res, next) => {
  getData(req, res, "gst_registration_company");
});

exports.updateGstRegistrationCompany = catchAsyncError(
  async (req, res, next) => {
    await generateUpdateStatement("gst_registration_company", req, "id");
    res.status(200).send({ message: "Request submitted" });
  }
);

//Services Endpoints
exports.getServices = catchAsyncError(async (req, res, next) => {
  getData(req, res, "services");
});

//GST registration properietorship
exports.getGstRegistrationproprietorship = catchAsyncError(
  async (req, res, next) => {
    getData(req, res, "gst_registration_proprietorship");
  }
);

exports.updateGstRegistrationproprietorship = catchAsyncError(
  async (req, res, next) => {
    await generateUpdateStatement("gst_registration_proprietorship", req, "id");
    res.status(200).send({ message: "Services Saved" });
  }
);

//GST registration partnership
exports.getGstRegistrationpartnership = catchAsyncError(
  async (req, res, next) => {
    getData(req, res, "gst_registration_partnership");
  }
);

exports.updateGstRegistrationpartnership = catchAsyncError(
  async (req, res, next) => {
    await generateUpdateStatement("gst_registration_partnership", req, "id");
    res.status(200).send({ message: "Request submitted" });
  }
);

//Property Registration
exports.getPropertyRegistrationRequests = catchAsyncError(
  async (req, res, next) => {
    getData(req, res, "property_registration");
  }
);

exports.updatePropertyRegistrationRequests = catchAsyncError(
  async (req, res, next) => {
    await generateUpdateStatement("property_registration", req, "id");
    res.status(200).send({ message: "Request submitted" });
  }
);

//Rental Agreement
exports.getRentalAgreements = catchAsyncError(async (req, res, next) => {
  getData(req, res, "rental_agreement");
});

exports.updateRentalAgreements = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("rental_agreement", req, "id");
  res.status(200).send({ message: "Request submitted" });
});
