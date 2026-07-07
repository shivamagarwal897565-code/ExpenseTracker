const Transaction = require("../models/Transaction");

const getSummary = async (userId) => {
  const summary = await Transaction.aggregate([
    {
      $match: {
        user: userId,
      },
    },

    {
      $group: {
        _id: "$type",

        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  let income = 0;
  let expense = 0;

  summary.forEach((item) => {
    if (item._id === "Income") {
      income = item.total;
    }

    if (item._id === "Expense") {
      expense = item.total;
    }
  });

  return {
    income,
    expense,
    balance: income - expense,
    savings: income - expense,
  };
};

module.exports = {
  getSummary,
};