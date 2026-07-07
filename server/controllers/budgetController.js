const Budget = require("../models/Budget");
const Category = require("../models/Category");

const {
  getBudgetProgress,
} = require("../services/BudgetService");


const createBudget = async (req, res) => {
  try {
    const {
      category,
      amount,
      month,
      year,
    } = req.body;

    if (
      !category ||
      amount === undefined ||
      month === undefined ||
      year === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than zero",
      });
    }

    if (month < 1 || month > 12) {
      return res.status(400).json({
        success: false,
        message: "Invalid month",
      });
    }


    const categoryExists = await Category.findOne({
      _id: category,
      user: req.user._id,
    });

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (categoryExists.type !== "Expense") {
  return res.status(400).json({
    success: false,
    message: "Budget can only be created for Expense categories",
  });
}


    const existing = await Budget.findOne({
      user: req.user._id,
      category,
      month,
      year,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          "Budget already exists for this category and month",
      });
    }

    const budget = await Budget.create({
      user: req.user._id,
      category,
      amount,
      month,
      year,
    });

    res.status(201).json({
      success: true,
      message: "Budget Created Successfully",
      budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getBudgets = async (req, res) => {
  try {
    const month =
      Number(req.query.month) ||
      new Date().getMonth() + 1;

    const year =
      Number(req.query.year) ||
      new Date().getFullYear();

    const budgets = await getBudgetProgress(
      req.user._id,
      month,
      year
    );

    res.status(200).json({
      success: true,
      month,
      year,
      budgets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("category");

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    res.status(200).json({
      success: true,
      budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    if (req.body.amount !== undefined) {
      if (req.body.amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be greater than zero",
        });
      }

      budget.amount = req.body.amount;
    }

    if (req.body.month !== undefined) {
      if (req.body.month < 1 || req.body.month > 12) {
        return res.status(400).json({
          success: false,
          message: "Invalid month",
        });
      }

      budget.month = req.body.month;
    }

    if (req.body.year !== undefined) {
      budget.year = req.body.year;
    }

    await budget.save();

    res.status(200).json({
      success: true,
      message: "Budget Updated Successfully",
      budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    await budget.deleteOne();

    res.status(200).json({
      success: true,
      message: "Budget Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBudget,
  getBudgets,
  getBudget,
  updateBudget,
  deleteBudget,
};