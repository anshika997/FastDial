const express = require("express");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const authController = require("../controllers/class-admins/authController");
const dataController = require("../controllers/class-admins/classAdminDataController");
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

// router.use(authController.protect);

//Boards Endpoints
router.get("/data/getBoards", dataController.getBoards);
router.post("/data/insertBoards", dataController.insertBoards);
router.post("/data/updateBoards", dataController.updateBoards);
router.delete("/data/deleteBoards/:id", dataController.deleteBoards);

//Classes Endpoints
router.get("/data/getClasses", dataController.getClasses);
router.post("/data/insertClasses", dataController.insertClasses);
router.post("/data/updateClasses", dataController.updateClasses);
router.delete("/data/deleteClasses/:id", dataController.deleteClasses);

router.get("/data/getClasses_Byid/:class_id", dataController.getClasses_Byid);

//Subjects Endpoints
router.get("/data/getSubjects", dataController.getSubjects);
router.post("/data/insertSubjects", dataController.insertSubjects);
router.post("/data/updateSubjects", dataController.updateSubjects);
router.delete("/data/deleteSubjects/:id", dataController.deleteSubjects);

//Sub Subjects Endpoints
router.get("/data/getSubSubjects", dataController.getSubSubjects);
router.post("/data/insertSubSubjects", dataController.insertSubSubjects);
router.post("/data/updateSubSubjects", dataController.updateSubSubjects);
router.delete("/data/deleteSubSubjects/:id", dataController.deleteSubSubjects);

//About Subjects
router.get("/data/getAboutSubjects", dataController.getAboutSubjects);
router.post("/data/insertAboutSubjects", dataController.insertAboutSubjects);
router.post("/data/updateAboutSubjects", dataController.updateAboutSubjects);
router.delete(
  "/data/deleteAboutSubjects/:id",
  dataController.deleteAboutSubjects
);
//Users class purchased
router.get("/data/getUserClassPurchased", dataController.getUserClassPurchased);
router.post(
  "/data/updateUserClassPurchased",
  dataController.updateUserClassPurchased
);

//Admins
router.get("/data/getAdmins", dataController.getAdmins);
router.post("/data/insertAdmins", dataController.insertAdmins);
router.post("/data/updateAdmins", dataController.updateAdmins);

//Chapters Endpoints
router.get("/data/getChapters", dataController.getChapters);
router.post("/data/insertChapters", dataController.insertChapters);
router.post("/data/updateChapters", dataController.updateChapters);
router.delete("/data/deleteChapters/:id", dataController.deleteChapters);

//Topics Endpoints
router.get("/data/getTopics", dataController.getTopics);
router.post("/data/insertTopics", dataController.insertTopics);
router.post("/data/updateTopics", dataController.updateTopics);
router.delete("/data/deleteTopics/:id", dataController.deleteTopics);

// reviews
router.get("/data/getreviews", dataController.getreviews);
router.post("/data/insertreviews", dataController.insertreviews);
router.post("/data/updatereviews", dataController.updatereviews);
router.delete("/data/deletereviews/:id", dataController.deletereviews);

// qna_.......

router.get("/data/getqna", dataController.getqna);
router.post("/data/insertqna", dataController.insertqna);
router.post("/data/updateqna", dataController.updateqna);
router.delete("/data/deleteqna/:question_id", dataController.deleteqna);

// cart_header
router.get("/data/getcart_header", dataController.getcart_header);
router.post("/data/insertcart_header", dataController.insertcart_header);
router.post("/data/updatecart_header", dataController.updatecart_header);
router.delete(
  "/data/deletecart_header/:cart_id",
  dataController.deletecart_header
);

// cart_items------------

router.get("/data/getcart_items", dataController.getcart_items);
router.post("/data/insertcart_items", dataController.insertcart_items);
router.post("/data/updatecart_items", dataController.updatecart_items);
router.delete(
  "/data/deletecart_items/:item_id",
  dataController.deletecart_header
);

// Payments
router.get("/data/getpayment_hsitory", dataController.getpayment_hsitory);
router.post(
  "/data/insertpayment_hsitory",
  dataController.insertpayment_hsitory
);
router.put("/data/updatepayment_hsitory", dataController.updatepayment_hsitory);

// cart_header
router.get("/data/getsubjects_purchased", dataController.getsubjects_purchased);
router.post(
  "/data/insertsubjects_purchased",
  dataController.insertsubjects_purchased
);
router.put(
  "/data/updatesubjects_purchased",
  dataController.updatesubjects_purchased
);

// testomonial....
router.get("/data/gettestimonial", dataController.gettestimonial);
router.post("/data/inserttestimonial", dataController.inserttestimonial);
router.post("/data/updatetestimonial", dataController.updatetestimonial);
router.delete("/data/deletetestimonial/:id", dataController.deletetestimonial);

module.exports = router;
