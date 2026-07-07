import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#16A34A", "#DC2626"];

const IncomeExpensePie = ({ summary }) => {
  const data = [
    {
      name: "Income",
      value: summary.income,
    },
    {
      name: "Expense",
      value: summary.expense,
    },
  ];

  return (
    <div className="chart-card">
      <h2>Income vs Expense</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpensePie;