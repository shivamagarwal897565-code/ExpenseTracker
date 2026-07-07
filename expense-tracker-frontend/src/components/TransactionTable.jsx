import { useNavigate } from "react-router-dom";

const TransactionTable = ({
  transactions,
  onDelete,
  showActions = true,
}) => {
  const navigate = useNavigate();

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>

          <th>Amount</th>

          <th>Category</th>

          <th>Type</th>

          <th>Date</th>

          <th>Payment</th>

          <th>Receipt</th>

          {showActions && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction._id}>
            <td>{transaction.title}</td>

            <td>₹ {transaction.amount}</td>

            <td>{transaction.category.name}</td>

            <td>{transaction.type}</td>

            <td>
              {new Date(transaction.date).toLocaleDateString()}
            </td>

            <td>{transaction.paymentMethod}</td>

            <td>
              {transaction.receipt?.url ? (
                <a
                  href={transaction.receipt.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              ) : (
                "No Receipt"
              )}
            </td>

            {showActions && (
              <td>
                <button
                  className="form-btn"
                  onClick={() =>
                    navigate(
                      `/transactions/edit/${transaction._id}`
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="secondary-btn"
                  style={{ marginLeft: 10 }}
                  onClick={() =>
                    onDelete(transaction._id)
                  }
                >
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;