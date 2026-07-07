const Transaction = require("../models/Transaction");

const {
  getSummary,
} = require("./transactionService");

const getDashboard = async (userId) => {
  const summary = await getSummary(userId);

  const recentTransactions =
    await Transaction.find({
      user: userId,
    })
      .sort({
        date: -1,
      })
      .limit(10);

  return {
    summary,
    recentTransactions,
  };
};

module.exports = {
  getDashboard,
};