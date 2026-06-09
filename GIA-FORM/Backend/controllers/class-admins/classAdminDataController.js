// node and express imports
const { promisify } = require("util");

// local imports
// const db = require("../../database/db");
const db = require("../../database/db");
const AppError = require("../../utils/appError");
const catchAsyncError = require("../../utils/catchAsyncError");
const getData = require("../../database/dbquerieshandlers");
const uploadfile = require("../../middlewares/s3bucket");
const {
  generateInsertStatement,
  generateUpdateStatement,
} = require("../../database/sqlStatementGenarator");

//Boards
exports.getBoards = catchAsyncError(async (req, res, next) => {
  getData(req, res, "boards");
});

exports.insertBoards = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("boards", req);
  res.status(200).send({ message: "Boards Saved!" });
});

exports.updateBoards = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("boards", req, "board_id");
  res.status(200).send({ message: "Boards Updated!" });
});

exports.deleteBoards = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM boards WHERE board_id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//Classes
exports.getClasses = catchAsyncError(async (req, res, next) => {
  getData(req, res, "boards_with_classes");
});

exports.getClasses_Byid = async (req, res) => {
  const { class_id } = req.params;
  try {
    const [rows] = await db("SELECT * FROM class WHERE class_id = ?", [
      class_id,
    ]);

    console.log("Fetched rows:", rows); // 🔹 Debugging ke liye

    if (rows.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.insertClasses = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("class", req);
  res.status(200).send({ message: "Class Saved" });
});

exports.updateClasses = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("class", req, "class_id");
  res.status(200).send({ message: "Class updated" });
});
exports.deleteClasses = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM class WHERE class_id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//Subjects
exports.getSubjects = catchAsyncError(async (req, res, next) => {
  getData(req, res, "subjects_with_class_and_boards");
});

exports.insertSubjects = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("subjects", req);
  res.status(200).send({ message: "Subject Saved!" });
});

exports.updateSubjects = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("subjects", req, "subject_id");
  res.status(200).send({ message: "Subject Updated" });
});
exports.deleteSubjects = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM subjects WHERE subject_id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//Sub Subjects
exports.getSubSubjects = catchAsyncError(async (req, res, next) => {
  getData(req, res, "sub_subjects_with_subject_class_boards");
});

exports.insertSubSubjects = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("sub_subjects", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateSubSubjects = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("sub_subjects", req, "sub_subject_id");
  res.status(200).send({ message: "Services Saved" });
});

exports.deleteSubSubjects = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM sub_subjects WHERE sub_subject_id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//About Subjects
exports.getAboutSubjects = catchAsyncError(async (req, res, next) => {
  getData(req, res, "view_about_subject");
});

exports.insertAboutSubjects = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("about_subject", req);
  res.status(200).send({ message: "Saved!" });
});

exports.updateAboutSubjects = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("about_subject", req, "id");
  res.status(200).send({ message: "Updated!" });
});

exports.deleteAboutSubjects = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM about_subject WHERE id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//User class purchased
exports.getUserClassPurchased = catchAsyncError(async (req, res, next) => {
  getData(req, res, "users_class_purchased_with_all_details");
});

exports.insertUserClassPurchased = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("users_class_purchased", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateUserClassPurchased = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("users_class_purchased", req, "purchase_id");
  res.status(200).send({ message: "Request submitted" });
});

//Admins
exports.getAdmins = catchAsyncError(async (req, res, next) => {
  getData(req, res, "class_admins");
});

exports.insertAdmins = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("class_admins", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateAdmins = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("class_admins", req, "admin_id");
  res.status(200).send({ message: "Request submitted" });
});

//Chapters
exports.getChapters = catchAsyncError(async (req, res, next) => {
  getData(req, res, "view_chapters");
});

exports.insertChapters = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("chapters", req);
  res.status(200).send({ message: "Saved!" });
});

exports.updateChapters = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("chapters", req, "chapter_id");
  res.status(200).send({ message: "Updated!" });
});

exports.deleteChapters = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM chapters WHERE chapter_id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//Topics
exports.getTopics = catchAsyncError(async (req, res, next) => {
  getData(req, res, "view_topics");
});

exports.insertTopics = catchAsyncError(async (req, res, next) => {
  req.body.qna = JSON.stringify(req.body.qna);
  await generateInsertStatement("topics", req);
  res.status(200).send({ message: "Saved!" });
});

exports.updateTopics = catchAsyncError(async (req, res, next) => {
  req.body.qna = JSON.stringify(req.body.qna);
  await generateUpdateStatement("topics", req, "topic_id");
  res.status(200).send({ message: "Updated!" });
});

exports.deleteTopics = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM topics WHERE topic_id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

// Prateek ===========
//reviews
exports.getreviews = catchAsyncError(async (req, res, next) => {
  getData(req, res, "reviews");
});

exports.insertreviews = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("reviews", req);
  res.status(200).send({ message: "Request submitted" });
});
//====Chandan =========
//reviews table

exports.updatereviews = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("reviews", req, "id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deletereviews = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM reviews WHERE id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

exports.getqna = catchAsyncError(async (req, res, next) => {
  getData(req, res, "qna");
});

exports.insertqna = catchAsyncError(async (req, res, next) => {
  req.body.questionanswers = JSON.stringify(req.body.questionanswers);
  await generateInsertStatement("qna", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateqna = catchAsyncError(async (req, res, next) => {
  req.body.questionanswers = JSON.stringify(req.body.questionanswers);
  await generateUpdateStatement("qna", req, "question_id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deleteqna = catchAsyncError(async (req, res, next) => {
  const id = req.params.question_id;
  if (!id) {
    return res
      .status(403)
      .send({ message: "Please pass question_id to delete" });
  }
  const statement = `DELETE FROM qna WHERE question_id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//cart_header

exports.getcart_header = catchAsyncError(async (req, res, next) => {
  getData(req, res, "cart_header");
});

exports.insertcart_header = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("cart_header", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updatecart_header = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("cart_header", req, "cart_id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deletecart_header = catchAsyncError(async (req, res, next) => {
  const id = req.params.item_id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM cart_header WHERE cart_id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

// cart_items

exports.getcart_items = catchAsyncError(async (req, res, next) => {
  getData(req, res, "cart_items");
});

exports.insertcart_items = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("cart_items", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updatecart_items = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("cart_items", req, "item_id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deletecart_items = catchAsyncError(async (req, res, next) => {
  const id = req.params.item_id;
  if (!id) {
    return res.status(403).send({ message: "Please pass id to delete" });
  }
  const statement = `DELETE FROM cart_items WHERE item_id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

//Payments
exports.getpayment_hsitory = catchAsyncError(async (req, res, next) => {
  getData(req, res, "payment_hsitory");
});

exports.insertpayment_hsitory = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("payment_hsitory", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updatepayment_hsitory = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("payment_hsitory", req, "item_id");
  res.status(200).send({ message: "Request submitted" });
});

//Subjects purchased
exports.getsubjects_purchased = catchAsyncError(async (req, res, next) => {
  getData(req, res, "subjects_purchased_view");
});

exports.insertsubjects_purchased = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("subjects_purchased", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updatesubjects_purchased = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("subjects_purchased", req, "item_id");
  res.status(200).send({ message: "Request submitted" });
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
