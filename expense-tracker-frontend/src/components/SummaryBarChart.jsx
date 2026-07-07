import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const SummaryBarChart = ({ summary }) => {

  const data = [
    {
      name: "Income",
      amount: summary.income,
    },
    {
      name: "Expense",
      amount: summary.expense,
    },
    {
      name: "Savings",
      amount: summary.savings,
    },
    {
      name: "Balance",
      amount: summary.balance,
    },
  ];

  return (
    <div className="chart-card">

      <h2>Financial Overview</h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="amount" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default SummaryBarChart;