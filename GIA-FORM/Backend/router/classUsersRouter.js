const express = require("express");
const multer = require("multer");

const authController = require("../controllers/class-users/authController");
const dataController = require("../controllers/class-users/classUsersDataController");
//const admindataController = require("../controllers/admin/admindataController");
const { body, validationResult } = require("express-validator");
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
router.post("/login/forgetPassword", authController.forgetPassword);
router.put("/login/updatePassword", authController.updatePassword);
router.post("/login/verifyOtp", authController.verifyOtp);

//router.use(authController.protect);

//Boards Endpoints
router.get("/data/getBoards", dataController.getBoards);

//Classes Endpoints
router.get("/data/getClasses", dataController.getClasses);

//Subjects Endpoints
router.get("/data/getSubjects", dataController.getSubjects);

//Sub Subjects Endpoints
router.get("/data/getSubSubjects", dataController.getSubSubjects);

//About Subjects
router.get("/data/getAboutSubjects", dataController.getAboutSubjects);

//Users class purchased
router.get("/data/getUserClassPurchased", dataController.getUserClassPurchased);
router.post(
  "/data/updateUserClassPurchased",
  dataController.updateUserClassPurchased
);
router.post(
  "/data/insertUserClassPurchased",
  dataController.insertUserClassPurchased
);

//Chapters Endpoints
router.get("/data/getChapters", dataController.getChapters);

//Topics Endpoints
router.get("/data/getTopics", dataController.getTopics);

//Payments

router.post("/data/processPayment", dataController.processPayment);

//AI Response
router.post("/data/getAiResponse", dataController.getAiResponse);

router.get("/data/getqna", dataController.getqna);
router.post("/data/insertqna", dataController.insertqna);
router.post("/data/updateqna", dataController.updateqna);
router.delete("/data/deleteqna/:question_id", dataController.deleteqna);

// Payments
router.get("/data/getpayment_hsitory", dataController.getpayment_hsitory);
router.post(
  "/data/insertpayment_hsitory",
  dataController.insertpayment_hsitory
);
router.put("/data/updatepayment_hsitory", dataController.updatepayment_hsitory);

// subjects_purchased
router.get("/data/getsubjects_purchased", dataController.getsubjects_purchased);
router.post(
  "/data/insertsubjects_purchased",
  dataController.insertsubjects_purchased
);
router.put(
  "/data/updatesubjects_purchased",
  dataController.updatesubjects_purchased
);

// reviews
router.get("/data/getreviews", dataController.getreviews);
router.post("/data/insertreviews", dataController.insertreviews);
router.post("/data/updatereviews", dataController.updatereviews);
router.delete("/data/deletereviews/:id", dataController.deletereviews);

//USER-CART

router.get("/data/getUSER_CART", dataController.getUSER_CART);
router.post("/data/insertUSER_CART", dataController.insertUSER_CART);
router.post("/data/updateUSER_CART", dataController.updateUSER_CART);
router.delete("/data/deleteUSER_CART/:cart_id", dataController.deleteUSER_CART);

//last cart_id..
router.get("/data/getLastCartId", dataController.getLastCartId);

//class_user....
router.get("/data/getclass_users", dataController.getclass_users);
router.post("/data/insertclass_users", dataController.insertclass_users);
router.put("/data/updateclass_users", dataController.updateclass_users);
router.delete(
  "/data/deleteclass_users/:user_id",
  dataController.deleteclass_users
);

router.get(
  "/data/getclassuser_favorites",
  dataController.getclassuser_favorites
);
router.post(
  "/data/insertclassuser_favorites",
  dataController.insertclassuser_favorites
);
// router.post(
//   "/data/updateclassuser_favorites",
//   dataController.updateclassuser_favorites
// );
router.delete(
  "/data/deleteclassuser_favorites/:favorite_id",
  dataController.deleteclassuser_favorites
);
router.get("/data/getClasses_Byid/:class_id", dataController.getClasses_Byid);

module.exports = router;
