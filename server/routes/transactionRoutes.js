const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

router.use(protect);

router
  .route("/")
  .get(getTransactions)
  .post(
    upload.single("receipt"),
    createTransaction
  );

router
  .route("/:id")
  .get(getTransaction)
  .put(upload.single("receipt"),updateTransaction)
  .delete(deleteTransaction);

module.exports = router;