import { useEffect, useState } from "react";

import { getDashboard } from "../../services/dashboardService";

import SummaryCard from "../../components/SummaryCard";
import TransactionTable from "../../components/TransactionTable";

import IncomeExpensePie from "../../components/IncomeExpensePie";
import SummaryBarChart from "../../components/SummaryBarChart";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();

      setSummary(data.summary);

      setTransactions(data.recentTransactions);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <h1 className="page-title">
        Dashboard
      </h1>

      {/* Summary Cards */}

      <div className="summary-grid">

        <SummaryCard
          title="Income"
          amount={summary.income}
          color="#16A34A"
        />

        <SummaryCard
          title="Expense"
          amount={summary.expense}
          color="#DC2626"
        />

        <SummaryCard
          title="Balance"
          amount={summary.balance}
          color="#2563EB"
        />

        <SummaryCard
          title="Savings"
          amount={summary.savings}
          color="#F59E0B"
        />

      </div>

      {/* Charts */}

      <div className="charts-grid">

        <IncomeExpensePie
          summary={summary}
        />

        <SummaryBarChart
          summary={summary}
        />

      </div>

      <h2
        style={{
          marginTop: "40px",
          marginBottom: "20px",
        }}
      >
        Recent Transactions
      </h2>

      <TransactionTable
        transactions={transactions}
        showActions={false}
      />

    </div>
  );
};

export default Dashboard;