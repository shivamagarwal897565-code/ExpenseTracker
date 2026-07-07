import { useNavigate } from "react-router-dom";

const BudgetTable = ({
  budgets,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Category</th>

          <th>Budget</th>

          <th>Spent</th>

          <th>Remaining</th>

          <th>Status</th>

          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {budgets.map((item) => (
          <tr key={item.budget._id}>
            <td>
              {item.budget.category.name}
            </td>

            <td>
              ₹ {item.budget.amount}
            </td>

            <td>
              ₹ {item.spent}
            </td>

            <td>
              ₹ {item.remaining}
            </td>

            <td>{item.status}</td>

            <td>
              <button
                className="form-btn"
                onClick={() =>
                  navigate(
                    `/budgets/edit/${item.budget._id}`
                  )
                }
              >
                Edit
              </button>

              <button
                className="secondary-btn"
                style={{
                  marginLeft: 10,
                }}
                onClick={() =>
                  onDelete(item.budget._id)
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BudgetTable;