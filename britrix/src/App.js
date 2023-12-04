import "./App.css";
import MainPage from "./MainPage";
import ServicesPage from "./ServicesPage";
import TaskManagerPage from "./TaskManagement/TaskManagerPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ManageTeam from "./TaskManagement/ManageTeam";
import RegisterUser from "./TaskManagement/ManageTeam/RegisterUser";
import RootLayout from "./Component/RootLayout";
import LoginPage from "./Login";
import UsersList from "./TaskManagement/ManageTeam/UsersList";
import UpdateUser from "./TaskManagement/ManageTeam/UpdateUser";
import TaskList from "./TaskManagement/ManageTasks/TaskList";
import ManageTask from "./TaskManagement/ManageTasks/ManageTask";
import RegisterTask from "./TaskManagement/ManageTasks/RegisterTask";
import UpdateTask from "./TaskManagement/ManageTasks/UpdateTask";
import ExpensesList from "./Sales/ExpensesList";
import AddExpenses from "./Sales/AddExpenses";
import UpdateExpense from "./Sales/UpdateExpense";
import SalesList from "./Sales/SalesList";
import AddSales from "./Sales/AddSales";
import UpdateSales from "./Sales/UpdateSales";
import ProjectList from "./TaskManagement/ManageProjects/ProjectList";
import RegisterProject from "./TaskManagement/ManageProjects/RegisterProject";
import UpdateProject from "./TaskManagement/ManageProjects/UpdateProject";
import ManageField from "./TaskManagement/ManageField/ManageField";
import EmailPage from "./Communication/EmailPage";
import ManageAnalytics from "./Analytics/ManageAnalytics";
import UserAnalytics from "./Analytics/UserAnalytics";
import FinanceAnalytics from "./Analytics/FinanceAnalytics";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainPage />}></Route>
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/task" element={<TaskManagerPage />} />

          <Route path="services/task/team" element={<ManageTeam />}>
            <Route path="create" element={<RegisterUser />} />
            <Route path="list" element={<UsersList />} />
            <Route path="update" element={<UpdateUser />} />
          </Route>
          <Route path="services/project">
            <Route path="list" element={<ProjectList />} />
            <Route path="create" element={<RegisterProject />} />
            <Route path="update" element={<UpdateProject />} />
          </Route>

          <Route path="services/task">
            <Route path="manage" element={<ManageTask />} />
            <Route path="view" element={<TaskList />} />
            <Route path="create" element={<RegisterTask />} />
            <Route path="update" element={<UpdateTask />} />
          </Route>

          <Route path="services/field">
            <Route path="manage" element={<ManageField   />} />
          </Route>


          {/* Sales&Expenses */}
          <Route path="services">
            <Route path="expenses" element={<ExpensesList />} />
            <Route path="expenses/add" element={<AddExpenses />} />
            <Route path="expenses/update" element={<UpdateExpense />} />
            <Route path="sales" element={<SalesList />} />
            <Route path="sales/add" element={<AddSales />} />
            <Route path="sales/update" element={<UpdateSales />} />
          </Route>

          {/* Communication */}
          <Route path="services">
             <Route path="email" element={<EmailPage />} />
          </Route>

           {/* Communication */}
           <Route path="analytics">
             <Route path="manage" element={<ManageAnalytics />} />
             <Route path="user" element={<UserAnalytics />} />
             <Route path="finance" element={<FinanceAnalytics />} />
          </Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
