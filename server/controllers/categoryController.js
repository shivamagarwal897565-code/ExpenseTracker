const Category = require("../models/Category");
const Transaction = require("../models/Transaction");
const Budget = require("../models/Budget");

const createCategory = async (req, res) => {
  try {
    const { name, type, color, icon } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: "Name and Type are required",
      });
    }

    const exists = await Category.findOne({
      name,
      type,
      user: req.user._id,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      type,
      color,
      icon,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Category Created",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      user: req.user._id,
    }).sort({ name: 1 });

    res.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }

    res.json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }

    category.name = req.body.name ?? category.name;

    if (
      req.body.type &&
      req.body.type !== category.type
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Category type cannot be changed once created",
      });
    }

    category.color = req.body.color ?? category.color;
    category.icon = req.body.icon ?? category.icon;

    await category.save();

    res.json({
      success: true,
      message: "Category Updated",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }

    const transactionExists = await Transaction.exists({
      "category.categoryId": category._id,
      user: req.user._id,
    });

    if (transactionExists) {
      return res.status(400).json({
        success: false,
        message:
          "Category is used in transactions and cannot be deleted.",
      });
    }

    const budgetExists = await Budget.exists({
      category: category._id,
      user: req.user._id,
    });

    if (budgetExists) {
      return res.status(400).json({
        success: false,
        message:
          "Category is assigned to a budget and cannot be deleted.",
      });
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: "Category Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};