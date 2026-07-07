import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getBudget,
  updateBudget,
} from "../../services/budgetService";

const EditBudget = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");

  const [form, setForm] = useState({
    amount: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    loadBudget();
  }, []);

  const loadBudget = async () => {
    try {
      const data = await getBudget(id);

      const budget = data.budget;

      setCategoryName(budget.category.name);

      setForm({
        amount: budget.amount,
        month: budget.month,
        year: budget.year,
      });

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to load budget"
      );
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateBudget(
        id,
        form
      );

      alert(response.message);

      navigate("/budgets");

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update budget"
      );
    }
  };

  return (
    <div>

      <h1 className="page-title">
        Edit Budget
      </h1>

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >

        <div className="form-group">
          <label>Category</label>

          <input
            value={categoryName}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Budget Amount</label>

          <input
            type="number"
            name="amount"
            min="1"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Month</label>

          <select
            name="month"
            value={form.month}
            onChange={handleChange}
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div className="form-group">
          <label>Year</label>

          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            required
          />
        </div>

        <button className="form-btn">
          Update Budget
        </button>

      </form>

    </div>
  );
};

export default EditBudget;