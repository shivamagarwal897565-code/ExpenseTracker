import { NavLink } from "react-router-dom";

const Sidebar = () => {

  return (

    <aside className="sidebar">

      <NavLink to="/">
        Dashboard
      </NavLink>

      <NavLink to="/profile">
        Profile
      </NavLink>

      <NavLink to="/categories">
        Categories
      </NavLink>

      <NavLink to="/categories/create">
        Create Category
      </NavLink>

      <NavLink to="/transactions">
        Transactions
      </NavLink>

      <NavLink to="/transactions/create">
        Create Transaction
      </NavLink>

      <NavLink to="/budgets">
        Budgets
      </NavLink>

      <NavLink to="/budgets/create">
        Create Budget
      </NavLink>

    </aside>

  );

};

export default Sidebar;