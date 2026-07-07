import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getTransaction,
  updateTransaction,
} from "../../services/transactionService";

import { getCategories } from "../../services/categoryService";

const EditTransaction = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [categories, setCategories] =
    useState([]);

  const [filteredCategories, setFilteredCategories] =
    useState([]);

  const [currentReceipt, setCurrentReceipt] =
    useState("");

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    paymentMethod: "Cash",
    date: "",
    notes: "",
    receipt: null,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const categoryData =
        await getCategories();

      const transactionData =
        await getTransaction(id);

      const transaction =
        transactionData.transaction;

      setCategories(
        categoryData.categories
      );

      setCurrentReceipt(
        transaction.receipt?.url || ""
      );

      const filtered =
        categoryData.categories.filter(
          (category) =>
            category.type ===
            transaction.type
        );

      setFilteredCategories(
        filtered
      );

      setForm({
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type,
        category:
          transaction.category
            .categoryId,
        paymentMethod:
          transaction.paymentMethod,
        date: transaction.date
          ? transaction.date.split(
              "T"
            )[0]
          : "",
        notes: transaction.notes,
        receipt: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      files,
    } = e.target;

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
      const data =
        new FormData();

      data.append(
        "title",
        form.title
      );

      data.append(
        "amount",
        form.amount
      );

      data.append(
        "category",
        form.category
      );

      data.append(
        "paymentMethod",
        form.paymentMethod
      );

      data.append(
        "date",
        form.date
      );

      data.append(
        "notes",
        form.notes
      );

      if (form.receipt) {
        data.append(
          "receipt",
          form.receipt
        );
      }

      const response =
        await updateTransaction(
          id,
          data
        );

      alert(response.message);

      navigate(
        "/transactions"
      );
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Unable to update transaction"
      );
    }
  };

  return (
    <div>
      <h1 className="page-title">
        Edit Transaction
      </h1>

      <form
        className="form-card"
        onSubmit={
          handleSubmit
        }
      >
        <div className="form-group">
          <label>
            Title
          </label>

          <input
            name="title"
            value={
              form.title
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="form-group">
          <label>
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={
              form.amount
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="form-group">
          <label>
            Transaction Type
          </label>

          <input
            value={
              form.type
            }
            disabled
          />
        </div>

        <div className="form-group">
          <label>
            Category
          </label>

          <select
            name="category"
            value={
              form.category
            }
            onChange={
              handleChange
            }
          >
            {filteredCategories.map(
              (
                category
              ) => (
                <option
                  key={
                    category._id
                  }
                  value={
                    category._id
                  }
                >
                  {
                    category.name
                  }
                </option>
              )
            )}
          </select>
        </div>

        <div className="form-group">
          <label>
            Payment Method
          </label>

          <select
            name="paymentMethod"
            value={
              form.paymentMethod
            }
            onChange={
              handleChange
            }
          >
            <option>
              Cash
            </option>

            <option>
              UPI
            </option>

            <option>
              Card
            </option>

            <option>
              Bank Transfer
            </option>

            <option>
              Cheque
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Date
          </label>

          <input
            type="date"
            name="date"
            value={
              form.date
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="form-group">
          <label>
            Notes
          </label>

          <input
            name="notes"
            value={
              form.notes
            }
            onChange={
              handleChange
            }
          />
        </div>

        {currentReceipt && (
          <div className="form-group">
            <label>
              Current Receipt
            </label>

            <br />

            <a
              href={
                currentReceipt
              }
              target="_blank"
              rel="noreferrer"
            >
              View Receipt
            </a>
          </div>
        )}

        <div className="form-group">
          <label>
            Replace Receipt
          </label>

          <input
            type="file"
            name="receipt"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={
              handleChange
            }
          />
        </div>

        <button className="form-btn">
          Update
          Transaction
        </button>
      </form>
    </div>
  );
};

export default EditTransaction;