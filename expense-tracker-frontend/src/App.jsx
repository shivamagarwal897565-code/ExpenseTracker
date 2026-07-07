import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import Dashboard from "./pages/Dashboard/Dashboard";

import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import ChangePassword from "./pages/Profile/ChangePassword";

import Categories from "./pages/Category/Categories";
import CreateCategory from "./pages/Category/CreateCategory";
import EditCategory from "./pages/Category/EditCategory";

import Transactions from "./pages/Transaction/Transactions";
import CreateTransaction from "./pages/Transaction/CreateTransaction";
import EditTransaction from "./pages/Transaction/EditTransaction";

import Budgets from "./pages/Budget/Budgets";
import CreateBudget from "./pages/Budget/CreateBudget";
import EditBudget from "./pages/Budget/EditBudget";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}

          <Route path="/login" element={<Login />} />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Protected Routes */}

          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/profile/edit"
              element={<EditProfile />}
            />

            <Route
              path="/profile/change-password"
              element={<ChangePassword />}
            />

            <Route
              path="/categories"
              element={<Categories />}
            />

            <Route
              path="/categories/create"
              element={<CreateCategory />}
            />

            <Route
              path="/categories/edit/:id"
              element={<EditCategory />}
            />

            <Route
              path="/transactions"
              element={<Transactions />}
            />

            <Route
              path="/transactions/create"
              element={<CreateTransaction />}
            />

            <Route
              path="/transactions/edit/:id"
              element={<EditTransaction />}
            />

            <Route
              path="/budgets"
              element={<Budgets />}
            />

            <Route
              path="/budgets/create"
              element={<CreateBudget />}
            />

            <Route
              path="/budgets/edit/:id"
              element={<EditBudget />}
            />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;