const SummaryCard = ({ title, amount, color }) => {
  return (
    <div
      className="summary-card"
      style={{
        borderLeft: `6px solid ${color}`,
      }}
    >
      <h3>{title}</h3>

      <h2>₹ {amount}</h2>
    </div>
  );
};

export default SummaryCard;