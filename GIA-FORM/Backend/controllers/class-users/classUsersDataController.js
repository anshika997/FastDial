// node and express imports
const { promisify } = require("util");
const axios = require("axios");
// local imports
const db = require("../../database/db");
const AppError = require("../../utils/appError");
const catchAsyncError = require("../../utils/catchAsyncError");
const getData = require("../../database/dbquerieshandlers");
const uploadfile = require("../../middlewares/s3bucket");
const { createOrder } = require("../../middlewares/payment");
const OpenAI = require("openai");
const {
  generateInsertStatement,
  generateUpdateStatement,
} = require("../../database/sqlStatementGenarator");
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey:
    "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",
});
//Boards
exports.getBoards = catchAsyncError(async (req, res, next) => {
  getData(req, res, "boards");
});

//Classes
exports.getClasses = catchAsyncError(async (req, res, next) => {
  getData(req, res, "boards_with_classes");
});

//Subjects
exports.getSubjects = catchAsyncError(async (req, res, next) => {
  getData(req, res, "subjects_with_class_and_boards");
});

//Sub Subjects
exports.getSubSubjects = catchAsyncError(async (req, res, next) => {
  getData(req, res, "sub_subjects_with_subject_class_boards");
});

//About Subjects
exports.getAboutSubjects = catchAsyncError(async (req, res, next) => {
  getData(req, res, "view_about_subject");
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

//Chapters
exports.getChapters = catchAsyncError(async (req, res, next) => {
  getData(req, res, "view_chapters");
});

exports.getTopics = catchAsyncError(async (req, res, next) => {
  getData(req, res, "view_topics");
});

//Payments
exports.processPayment = catchAsyncError(async (req, res, next) => {
  createOrder(req, res);
});

//AI Response
exports.getAiResponse = catchAsyncError(async (req, res, next) => {
  const { messages } = req.body;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [{ role: "user", content: messages }],
  });

  // completion.then((result) => console.log(result.choices[0].message));
  console.log(completion.choices[0].message);
  res.status(201).send(completion.choices[0].message.content);
});

// qna_

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
//Payments
exports.getpayment_hsitory = catchAsyncError(async (req, res, next) => {
  getData(req, res, "payment_hsitory");
});

exports.insertpayment_hsitory = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("payment_hsitory", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updatepayment_hsitory = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("payment_hsitory", req, "payment_id");
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
  await generateUpdateStatement("subjects_purchased", req, "purchase_id");
  res.status(200).send({ message: "Request submitted" });
});

//reviews
exports.getreviews = catchAsyncError(async (req, res, next) => {
  getData(req, res, "reviews");
});

// exports.insertreviews = catchAsyncError(async (req, res, next) => {
//   await generateInsertStatement("reviews", req);
//   res.status(200).send({ response: "Creates data" });
// });

exports.insertreviews = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("reviews", req);

  const fetchSql = `SELECT * FROM reviews ORDER BY id DESC LIMIT 1;`;
  const [insertedRow] = await db(fetchSql);

  if (!insertedRow) {
    return res.status(400).send({ response: "Failed to create review" });
  }

  res.status(200).send({
    response: "Review created successfully",
    data: insertedRow,
  });
});

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

// USER_CART Endpoints****************************************************************

exports.getUSER_CART = catchAsyncError(async (req, res, next) => {
  getData(req, res, "USER_CART");
});

// Insert user cart item
exports.insertUSER_CART = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("USER_CART", req);
  res.status(200).send({ message: "Item added to cart" });
});

// Update user cart item
exports.updateUSER_CART = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("USER_CART", req, "cart_id");
  res.status(200).send({ message: "Cart item updated" });
});

// Delete user cart item
exports.deleteUSER_CART = catchAsyncError(async (req, res, next) => {
  const id = req.params.cart_id;
  if (!id) {
    return res.status(403).send({ message: "Please pass cart_id to delete" });
  }
  const statement = `DELETE FROM USER_CART WHERE cart_id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Cart item removed" });
});

//last cart_id ...
exports.getLastCartId = catchAsyncError(async (req, res, next) => {
  const query = "SELECT cart_id FROM USER_CART ORDER BY cart_id DESC LIMIT 1";

  const result = await db(query); // Assuming `db` is a promise-based database function
  if (result.length === 0) {
    return res.status(404).send({ message: "No cart entries found" });
  }

  res.status(200).send({ last_cart_id: result[0].cart_id });
});

//class_user....
exports.getclass_users = catchAsyncError(async (req, res, next) => {
  getData(req, res, "class_users");
});

exports.insertclass_users = catchAsyncError(async (req, res, next) => {
  // req.body.questionanswers = JSON.stringify(req.body.questionanswers);
  await generateInsertStatement("class_users", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateclass_users = catchAsyncError(async (req, res, next) => {
  // req.body.questionanswers = JSON.stringify(req.body.questionanswers);
  await generateUpdateStatement("class_users", req, "user_id");
  res.status(200).send({ message: "Request submitted" });
});

exports.deleteclass_users = catchAsyncError(async (req, res, next) => {
  const id = req.params.user_id;
  if (!id) {
    return res.status(403).send({ message: "Please pass user_id to delete" });
  }
  const statement = `DELETE FROM class_users WHERE user_id = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
});

exports.getclassuser_favorites = catchAsyncError(async (req, res, next) => {
  getData(req, res, "classuser_favorites");
});

exports.insertclassuser_favorites = catchAsyncError(async (req, res, next) => {
  const result = await generateInsertStatement("classuser_favorites", req);

  res
    .status(200)
    .send({ message: "request Submitted", new_id: result.insertId });
});

// Update  items
// exports.updateclassuser_favorites = catchAsyncError(async (req, res, next) => {
//   await generateUpdateStatement("classuser_favorites", req, "favorite_id");
//   res.status(200).send({ message: "Request Submitted" });
// });

// Delete  items
exports.deleteclassuser_favorites = catchAsyncError(async (req, res, next) => {
  const id = req.params.favorite_id;
  if (!id) {
    return res
      .status(403)
      .send({ message: "Please pass  favorite_id  to delete" });
  }
  const statement = `DELETE FROM classuser_favorites WHERE  favorite_id  = ?`;
  await db(statement, id);
  res.status(201).send({ message: "Resource deleted" });
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
