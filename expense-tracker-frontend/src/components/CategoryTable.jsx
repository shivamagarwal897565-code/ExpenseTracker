import { useNavigate } from "react-router-dom";

const CategoryTable = ({ categories, onDelete }) => {

  const navigate = useNavigate();

  return (

    <table className="table">

      <thead>

        <tr>

          <th>Name</th>

          <th>Type</th>

          <th>Color</th>

          <th>Icon</th>

          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

        {categories.map((category) => (

          <tr key={category._id}>

            <td>{category.name}</td>

            <td>{category.type}</td>

            <td>

              <div
                style={{
                  width:25,
                  height:25,
                  borderRadius:"50%",
                  background:category.color,
                  margin:"auto"
                }}
              />

            </td>

            <td>{category.icon}</td>

            <td>

              <button
                className="form-btn"
                onClick={() =>
                  navigate(`/categories/edit/${category._id}`)
                }
              >
                Edit
              </button>

              <button
                className="secondary-btn"
                style={{marginLeft:10}}
                onClick={() =>
                  onDelete(category._id)
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

export default CategoryTable;