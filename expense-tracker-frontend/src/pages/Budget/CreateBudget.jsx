import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCategories } from "../../services/categoryService";
import { createBudget } from "../../services/budgetService";

const CreateBudget = () => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const currentDate = new Date();

  const [form, setForm] = useState({
    category: "",
    amount: "",
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {

      const data = await getCategories();

      const expenseCategories = data.categories.filter(
        category => category.type === "Expense"
      );

      setCategories(expenseCategories);

      if (expenseCategories.length > 0) {

        setForm(prev => ({
          ...prev,
          category: expenseCategories[0]._id,
        }));

      }

    } catch (error) {

      console.log(error);

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

      const response = await createBudget(form);

      alert(response.message);

      navigate("/budgets");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to create budget"
      );

    }

  };

  return (

    <div>

      <h1 className="page-title">

        Create Budget

      </h1>

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>Expense Category</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >

            {categories.map(category => (

              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>

            ))}

          </select>

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

          Create Budget

        </button>

      </form>

    </div>

  );

};

export default CreateBudget;