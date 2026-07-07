const bcrypt = require("bcryptjs");
const Category = require("../models/Category");
const User = require("../models/User");

const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const defaultCategories = [
  {
    name: "Salary",
    type: "Income",
    color: "#22C55E",
    icon: "salary",
  },
  {
    name: "Freelancing",
    type: "Income",
    color: "#10B981",
    icon: "work",
  },
  {
    name: "Bonus",
    type: "Income",
    color: "#84CC16",
    icon: "bonus",
  },
  {
    name: "Investment",
    type: "Income",
    color: "#16A34A",
    icon: "investment",
  },
  {
    name: "Other Income",
    type: "Income",
    color: "#4ADE80",
    icon: "money",
  },

  {
    name: "Food",
    type: "Expense",
    color: "#EF4444",
    icon: "restaurant",
  },
  {
    name: "Rent",
    type: "Expense",
    color: "#F97316",
    icon: "home",
  },
  {
    name: "Shopping",
    type: "Expense",
    color: "#EC4899",
    icon: "shopping",
  },
  {
    name: "Fuel",
    type: "Expense",
    color: "#F59E0B",
    icon: "fuel",
  },
  {
    name: "Bills",
    type: "Expense",
    color: "#DC2626",
    icon: "receipt",
  },
  {
    name: "Medical",
    type: "Expense",
    color: "#E11D48",
    icon: "medical",
  },
  {
    name: "Education",
    type: "Expense",
    color: "#3B82F6",
    icon: "school",
  },
  {
    name: "Entertainment",
    type: "Expense",
    color: "#8B5CF6",
    icon: "movie",
  },
  {
    name: "Travel",
    type: "Expense",
    color: "#06B6D4",
    icon: "flight",
  },
  {
    name: "Others",
    type: "Expense",
    color: "#6B7280",
    icon: "category",
  },
];

const categories = defaultCategories.map((category) => ({
  ...category,
  user: user._id,
}));

await Category.insertMany(categories);

    res.status(201).json({
      message: "Registration Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};