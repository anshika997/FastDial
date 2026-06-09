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

exports.insertAffidavitsRequest = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("affidavit_requests", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateAffidavitsRequest = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("affidavit_requests", req, "request_id");
  res.status(200).send({ message: "Request submitted" });
});

//Gst Registration Company
exports.getGstRegistrationCompany = catchAsyncError(async (req, res, next) => {
  getData(req, res, "gst_registration_company");
});

exports.insertGstRegistrationCompany = catchAsyncError(
  async (req, res, next) => {
    await generateInsertStatement("gst_registration_company", req);
    res.status(200).send({ message: "Request submitted" });
  }
);

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

exports.insertServices = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("services", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateServices = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("services", req, "service_id");
  res.status(200).send({ message: "Services Saved" });
});

//GST registration properietorship
exports.getGstRegistrationproprietorship = catchAsyncError(
  async (req, res, next) => {
    getData(req, res, "gst_registration_proprietorship");
  }
);

exports.insertGstRegistrationproprietorship = catchAsyncError(
  async (req, res, next) => {
    await generateInsertStatement("gst_registration_proprietorship", req);
    res.status(200).send({ message: "Request submitted" });
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

exports.insertGstRegistrationpartnership = catchAsyncError(
  async (req, res, next) => {
    await generateInsertStatement("gst_registration_partnership", req);
    res.status(200).send({ message: "Request submitted" });
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

exports.insertPropertyRegistrationRequests = catchAsyncError(
  async (req, res, next) => {
    await generateInsertStatement("property_registration", req);
    res.status(200).send({ message: "Request submitted" });
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

exports.insertRentalAgreements = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("rental_agreement", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateRentalAgreements = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("rental_agreement", req, "id");
  res.status(200).send({ message: "Request submitted" });
});

//Vendors Endpoints
exports.getVendors = catchAsyncError(async (req, res, next) => {
  getData(req, res, "vendors");
});

//Dynamic form
exports.getForms = catchAsyncError(async (req, res, next) => {
  getData(req, res, "forms");
});

// exports.insertForms = catchAsyncError(async (req, res, next) => {
//   const { formName, fields } = req.body;
//   const query = `INSERT INTO forms (name, fields) VALUES (?, ?)`;
//   await db(query, [formName, JSON.stringify(fields)]);
//   res.status(200).send({ message: "Request submitted" });
// });

exports.insertForms = catchAsyncError(async (req, res, next) => {
  const { name, form_name, fields, group_id } = req.body;

  if (!name || !fields) {
    return res
      .status(400)
      .json({ message: "Form name and fields are required" });
  }

  const query = `INSERT INTO forms (name, form_name, fields, group_id) VALUES (?, ?, ?, ?)`;
  await db(query, [
    name,
    form_name || null,
    JSON.stringify(fields),
    group_id || null,
  ]);

  res.status(200).send({ message: "Form inserted successfully" });
});

exports.updateForms = catchAsyncError(async (req, res, next) => {
  const { id, name ,fields } = req.body;
  const query = `UPDATE forms SET name = ?, fields = ? WHERE id = ?`;
  await db(query, [name, JSON.stringify(fields), id]);
  res.status(200).send({ message: "Request submitted" });
});

exports.deleteForms = catchAsyncError(async (req, res, next) => {
  const { id } = req.body;
  const query = `DELETE FROM forms WHERE id = ?`;
  await db(query, id);
  res.status(200).send({ message: "Request submitted" });
});

// Get all form groups
exports.getform_groups = catchAsyncError(async (req, res, next) => {
  getData(req, res, "form_groups");
});

// Insert a new form group
exports.insertform_groups = catchAsyncError(async (req, res, next) => {
  const { group_name } = req.body;
  const query = `INSERT INTO form_groups (group_name) VALUES (?)`;
  await db(query, [group_name]);
  res.status(200).send({ message: "Group created successfully" });
});

exports.updateform_groups = catchAsyncError(async (req, res, next) => {
  const { id, group_name } = req.body;
  const query = `UPDATE form_groups SET group_name = ? WHERE id = ?`;
  await db(query, [group_name, id]);
  res.status(200).send({ message: "Form group updated" });
});

exports.deleteform_groups = catchAsyncError(async (req, res, next) => {
  const { id } = req.body;
  const query = `DELETE FROM form_groups WHERE id = ?`;
  await db(query, [id]);
  res.status(200).send({ message: "Form group deleted" });
});

//Form responses
exports.getFormsResponses = catchAsyncError(async (req, res, next) => {
  getData(req, res, "form_response_view");
});

// exports.insertFormsResponses = catchAsyncError(async (req, res, next) => {
//   const { form_id, responses } = req.body;
//   const query = `INSERT INTO responses (form_id, responses) VALUES (?, ?)`;
//   await db(query, [form_id, JSON.stringify(responses)]);
//   res.status(200).send({ message: "Request submitted" });
// });

exports.insertFormsResponses = catchAsyncError(async (req, res, next) => {
  const { form_id, user_name, phone_number, responses } = req.body;

  if (!form_id || !user_name || !phone_number || !responses) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for existing phone_number
  const existing = await db(`SELECT id FROM responses WHERE phone_number = ?`, [
    phone_number,
  ]);

  if (existing.length > 0) {
    return res.status(409).json({
      message: "This phone number has already submitted a response",
    });
  }

  const query = `
    INSERT INTO responses (form_id, user_name, phone_number, responses)
    VALUES (?, ?, ?, ?)
  `;

  await db(query, [
    form_id,
    user_name,
    phone_number,
    JSON.stringify(responses),
  ]);

  res.status(200).send({ message: "Response submitted successfully" });
});

exports.deleteFormsResponses = catchAsyncError(async (req, res, next) => {
  const form_id = req.params.id;
  if (!form_id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM responses WHERE form_id = ?`;
  await db(statement, form_id);
  res.status(201).send({ message: "Resource deleted" });
});

exports.getformData = catchAsyncError(async (req, res, next) => {
  getData(req, res, "flutterflirtformdat");
});
exports.insertformData = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("flutterflirtformdat", req);
  res.status(200).send({ message: "Request submitted" });
});

//GST Registration
exports.getGstRegistrations = catchAsyncError(async (req, res, next) => {
  getData(req, res, "gstregistration");
});

exports.insertGstRegistrations = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateInsertStatement("gstregistration", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateGstRegistrations = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateUpdateStatement("gstregistration", req, "id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deleteGstRegistrations = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM gstregistration WHERE id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//PAN Registration
exports.getPanRegistrations = catchAsyncError(async (req, res, next) => {
  getData(req, res, "panRegistration");
});

exports.insertPanRegistrations = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateInsertStatement("panRegistration", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updatePanRegistrations = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateUpdateStatement("panRegistration", req, "id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deletePanRegistrations = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM panRegistration WHERE id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//TAN Registration
exports.getTanRegistrations = catchAsyncError(async (req, res, next) => {
  getData(req, res, "tanApplication");
});

exports.insertTanRegistrations = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateInsertStatement("tanApplication", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateTanRegistrations = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateUpdateStatement("tanApplication", req, "id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deleteTanRegistrations = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM tanApplication WHERE id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//TDS Return
exports.getTdsReturns = catchAsyncError(async (req, res, next) => {
  getData(req, res, "tdsreturn");
});

exports.insertTdsReturns = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateInsertStatement("tdsreturn", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateTdsReturns = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateUpdateStatement("tdsreturn", req, "id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deleteTdsReturns = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM tdsreturn WHERE id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//Legal notice
exports.getLegalNotices = catchAsyncError(async (req, res, next) => {
  getData(req, res, "legalNotice");
});

exports.insertLegalNotices = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateInsertStatement("legalNotice", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateLegalNotices = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateUpdateStatement("legalNotice", req, "id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deleteLegalNotices = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM legalNotice WHERE id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//Legal notice
exports.getSaleAggrement = catchAsyncError(async (req, res, next) => {
  getData(req, res, "saleAggrement");
});

exports.insertSaleAggrement = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateInsertStatement("saleAggrement", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateSaleAggrement = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateUpdateStatement("saleAggrement", req, "id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deleteSaleAggrement = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM saleAggrement WHERE id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//Sale deed
exports.getSaledeed = catchAsyncError(async (req, res, next) => {
  getData(req, res, "saledeed");
});

exports.insertSaledeed = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateInsertStatement("saledeed", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateSaledeed = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateUpdateStatement("saledeed", req, "id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deleteSaledeed = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM saledeed WHERE id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//Affidavit
exports.getAffidavid = catchAsyncError(async (req, res, next) => {
  getData(req, res, "affidavid");
});

exports.insertAffidavid = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateInsertStatement("affidavid", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateAffidavid = catchAsyncError(async (req, res, next) => {
  req.body.qNa = JSON.stringify(req.body.qNa);
  await generateUpdateStatement("affidavid", req, "id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deleteAffidavid = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM affidavid WHERE id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//testonomial.....
exports.gettestimonial = catchAsyncError(async (req, res, next) => {
  getData(req, res, "testimonial");
});

exports.inserttestimonial = catchAsyncError(async (req, res, next) => {
  // req.body.qNa = JSON.stringify(req.body.qNa);
  await generateInsertStatement("testimonial", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updatetestimonial = catchAsyncError(async (req, res, next) => {
  // req.body.qNa = JSON.stringify(req.body.qNa);
  await generateUpdateStatement("testimonial", req, "id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deletetestimonial = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM testimonial WHERE id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});
