import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CategoryTable from "../../components/CategoryTable";

import {
  getCategories,
  deleteCategory,
} from "../../services/categoryService";

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data.categories);
      setAllCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setSelectedCategory(value);

    if (value === "") {
      setCategories(allCategories);
      return;
    }

    const filtered = allCategories.filter(
      (category) => category._id === value
    );

    setCategories(filtered);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    try {
      const data = await deleteCategory(id);

      alert(data.message);

      loadCategories();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div>
      <h1 className="page-title">Categories</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{
            padding: "10px",
            width: "320px",
          }}
        >
          <option value="">All Categories</option>

          {allCategories.map((category) => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <button
          className="form-btn"
          onClick={() => navigate("/categories/create")}
        >
          Create Category
        </button>
      </div>

      <CategoryTable
        categories={categories}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Categories;