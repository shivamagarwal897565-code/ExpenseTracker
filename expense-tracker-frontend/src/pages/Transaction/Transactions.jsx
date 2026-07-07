import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TransactionTable from "../../components/TransactionTable";

import {
  getTransactions,
  deleteTransaction,
} from "../../services/transactionService";

const Transactions = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions();

      setTransactions(data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      const data = await deleteTransaction(id);

      alert(data.message);

      loadTransactions();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete transaction"
      );
    }
  };

  return (
    <div>
      <h1 className="page-title">
        Transactions
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
            navigate("/transactions/create")
          }
        >
          Create Transaction
        </button>
      </div>

      <TransactionTable
        transactions={transactions}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Transactions;