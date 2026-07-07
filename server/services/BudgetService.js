const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");

const getBudgetProgress = async (userId, month, year) => {

    const budgets = await Budget.find({
        user: userId,
        month,
        year
    }).populate("category");

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const expenses = await Transaction.aggregate([
        {
            $match: {
                user: userId,
                type: "Expense",
                date: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
        },

        {
            $group: {
                _id: "$category.categoryId",
                spent: {
                    $sum: "$amount"
                }
            }
        }
    ]);

    const expenseMap = {};

    expenses.forEach((item) => {
    if (item._id) {
        expenseMap[item._id.toString()] = item.spent;
    }
});

    return budgets.map(budget => {

        const spent =
            expenseMap[budget.category._id.toString()] || 0;

        const remaining =
            budget.amount - spent;

        const percentage =
            budget.amount === 0
                ? 0
                : Number(
                    (
                        spent /
                        budget.amount *
                        100
                    ).toFixed(2)
                );

        let status = "Safe";

        if (percentage >= 100)
            status = "Exceeded";

        else if (percentage >= 80)
            status = "Warning";

        return {

            budget,

            spent,

            remaining,

            percentage,

            status

        };

    });

};

module.exports = {

    getBudgetProgress

};