import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCategories } from "../../services/categoryService";

import { createTransaction } from "../../services/transactionService";

const CreateTransaction = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [filteredCategories, setFilteredCategories] =
    useState([]);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "Expense",
    category: "",
    paymentMethod: "Cash",
    date: "",
    notes: "",
    receipt: null,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [categories, form.type]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const filterCategories = () => {
    const result = categories.filter(
      (category) => category.type === form.type
    );

    setFilteredCategories(result);

    if (result.length > 0) {
      setForm((prev) => ({
        ...prev,
        category: result[0]._id,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "receipt") {
      setForm({
        ...form,
        receipt: files[0],
      });

      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", form.title);

      data.append("amount", form.amount);

      data.append("type", form.type);

      data.append("category", form.category);

      data.append(
        "paymentMethod",
        form.paymentMethod
      );

      data.append("date", form.date);

      data.append("notes", form.notes);

      if (form.receipt) {
        data.append("receipt", form.receipt);
      }

      const response =
        await createTransaction(data);

      alert(response.message);

      navigate("/transactions");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to create transaction"
      );
    }
  };

  return (
    <div>
      <h1 className="page-title">
        Create Transaction
      </h1>

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Title</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount</label>

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Transaction Type</label>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="Income">
              Income
            </option>

            <option value="Expense">
              Expense
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {filteredCategories.map(
              (category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              )
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Payment Method</label>

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
            <option>Cash</option>

            <option>UPI</option>

            <option>Card</option>

            <option>
              Bank Transfer
            </option>

            <option>Cheque</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Notes</label>

          <input
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Receipt</label>

          <input
            type="file"
            name="receipt"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleChange}
          />
        </div>

        <button className="form-btn">
          Create Transaction
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;