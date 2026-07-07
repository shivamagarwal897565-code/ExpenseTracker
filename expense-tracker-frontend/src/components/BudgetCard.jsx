const BudgetCard = ({ item }) => {

  const getStatusColor = () => {

    switch (item.status) {

      case "Safe":
        return "#22c55e";

      case "Warning":
        return "#f59e0b";

      case "Exceeded":
        return "#ef4444";

      default:
        return "#6b7280";

    }

  };

  return (

    <div className="budget-card">

      <div className="budget-header">

        <h3>{item.budget.category.name}</h3>

        <span
          className="status-badge"
          style={{
            backgroundColor: getStatusColor()
          }}
        >
          {item.status}
        </span>

      </div>

      <p>

        Budget :
        <strong> ₹{item.budget.amount}</strong>

      </p>

      <p>

        Spent :
        <strong> ₹{item.spent}</strong>

      </p>

      <p>

        Remaining :
        <strong> ₹{item.remaining}</strong>

      </p>

      <div className="progress-container">

        <div
          className="progress-fill"
          style={{
            width: `${Math.min(item.percentage,100)}%`,
            backgroundColor: getStatusColor()
          }}
        />

      </div>

      <p>

        {item.percentage}% Used

      </p>

    </div>

  );

};

export default BudgetCard;