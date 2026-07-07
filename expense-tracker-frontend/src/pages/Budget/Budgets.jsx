import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BudgetCard from "../../components/BudgetCard";
import BudgetTable from "../../components/BudgetTable";

import {
  getBudgets,
  deleteBudget,
} from "../../services/budgetService";

const Budgets = () => {
  const navigate = useNavigate();

  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    try {
      const data = await getBudgets();

      setBudgets(data.budgets);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this budget?")) return;

    try {
      const data = await deleteBudget(id);

      alert(data.message);

      loadBudgets();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete budget"
      );
    }
  };

  return (
    <div>
      <h1 className="page-title">
        Budgets
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button
          className="form-btn"
          onClick={() =>
            navigate("/budgets/create")
          }
        >
          Create Budget
        </button>
      </div>

      <div className="budget-grid">
        {budgets.map((item) => (
          <BudgetCard
            key={item.budget._id}
            item={item}
          />
        ))}
      </div>

      <BudgetTable
        budgets={budgets}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Budgets;