const Transaction = require("../models/Transaction");
const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");

const createTransaction = async (req, res) => {
  try {
    const {
      title,
      amount,
      type,
      category,
      paymentMethod,
      date,
      notes,
    } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than zero",
      });
    }

    const selectedCategory = await Category.findOne({
      _id: category,
      user: req.user._id,
    });

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (selectedCategory.type !== type) {
      return res.status(400).json({
        success: false,
        message: "Category type does not match transaction type",
      });
    }

    let receipt = {
      url: "",
      publicId: "",
    };

    if (req.file) {
      receipt = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    const transaction = await Transaction.create({
      title,
      amount,
      type,

      category: {
        categoryId: selectedCategory._id,
        name: selectedCategory.name,
        color: selectedCategory.color,
        icon: selectedCategory.icon,
      },

      paymentMethod,
      date,
      notes,
      receipt,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Transaction Created",
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    const query = {
      user: req.user._id,
    };

    if (type) {
      query.type = type;
    }

    if (category) {
      query["category.categoryId"] = category;
    }

    if (startDate || endDate) {
      query.date = {};

      if (startDate) {
        query.date.$gte = new Date(startDate);
      }

      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    const transactions = await Transaction.find(query).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    const {
      title,
      amount,
      paymentMethod,
      date,
      notes,
      category,
    } = req.body;

    if (category) {
      const selectedCategory = await Category.findOne({
        _id: category,
        user: req.user._id,
      });

      if (!selectedCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      if (selectedCategory.type !== transaction.type) {
        return res.status(400).json({
          success: false,
          message: "Selected category does not match transaction type.",
        });
      }

      transaction.category = {
        categoryId: selectedCategory._id,
        name: selectedCategory.name,
        color: selectedCategory.color,
        icon: selectedCategory.icon,
      };
    }

    transaction.title = title ?? transaction.title;

    if (amount !== undefined) {
      if (amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be greater than zero",
        });
      }

      transaction.amount = amount;
    }

    transaction.paymentMethod =
      paymentMethod ?? transaction.paymentMethod;

    transaction.date = date ?? transaction.date;

    transaction.notes = notes ?? transaction.notes;

    if (req.file) {
      if (transaction.receipt?.publicId) {
        await cloudinary.uploader.destroy(
          transaction.receipt.publicId
        );
      }

      transaction.receipt = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    await transaction.save();

    res.status(200).json({
      success: true,
      message: "Transaction Updated",
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    if (transaction.receipt?.publicId) {
      await cloudinary.uploader.destroy(
        transaction.receipt.publicId
      );
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};