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
// Login Management
import LoginPage from "./Login";
// Team Management
import ManageTeam from "./TaskManagement/ManageTeams";
import RegisterUser from "./TaskManagement/ManageTeam/RegisterUser";
import RootLayout from "./Component/RootLayout";
import UsersList from "./TaskManagement/ManageTeam/UsersList";
import UpdateUser from "./TaskManagement/ManageTeam/UpdateUser";
// Task Management
import TaskList from "./TaskManagement/ManageTasks/TaskList";
import ManageTask from "./TaskManagement/ManageTasks/ManageTask";
import RegisterTask from "./TaskManagement/ManageTasks/RegisterTask";
import UpdateTask from "./TaskManagement/ManageTasks/UpdateTask";
// Expense Management
import ExpensesList from "./Sales/ExpensesList";
import AddExpenses from "./Sales/AddExpenses";
import UpdateExpense from "./Sales/UpdateExpense";
// Project Management
import ProjectList from "./TaskManagement/ManageProjects/ProjectList";
import RegisterProject from "./TaskManagement/ManageProjects/RegisterProject";
import UpdateProject from "./TaskManagement/ManageProjects/UpdateProject";
import ManageField from "./TaskManagement/ManageField/ManageField";
import EmailPage from "./Communication/EmailPage";
// Analytics Management
import ManageAnalytics from "./Analytics/ManageAnalytics";
import UserAnalytics from "./Analytics/UserAnalytics";
import FinanceAnalytics from "./Analytics/FinanceAnalytics";
import TrackTask from "./Analytics/TrackTask";
// Companies Managment
import AddCompanies from "./ManageCompanies/AddCompanies";
import ViewCompanies from "./ManageCompanies/ViewCompanies";
import UpdateCompany from "./ManageCompanies/UpdateCompany";
// Payment Management
import ManagePayment from "./Payment/ManagePayment";
import AddPayment from "./Payment/AddPayment";
import AddInvoice from "./Payment/AddInvoice";
import UpdateInvoice from "./Payment/UpdateInvoice";
import ViewPayment from "./Payment/ViewPayment";
import UndefinedRoute from "./UndefinedRoute";
import MainEmployeePage from "./Employee/MainEmployeePage";

import { useUserRole } from "./UserRoleContext";
import RootEmployeePage from "./Employee/RootEmployeePage";
import EmployeeManageTask from "./Employee/TaskManagement/ManageTask";
import UpdateEmployeeTask from "./Employee/TaskManagement/UpdateEmployeeTask";
import UpdateEmployeeInfo from "./Employee/TaskManagement/UpdateEmployeeInfo";

function App() {
  const { userRole } = useUserRole();

  // var userRole = GETUserRole()
  var Role = userRole || "Login";

  const isAuthenticated = true;
  if (!isAuthenticated) {
    Role = "Login";
    return null;
  }

  const LoginRoutes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<UndefinedRoute />} />
      </Route>
    )
  );

  const EmployeeRoutes = createBrowserRouter(
    createRoutesFromElements(
     <Route>
       <Route path="/" element={<RootEmployeePage />}>
        <Route path={"/"} element={<MainEmployeePage />} />
        <Route path={"manage"} element={<EmployeeManageTask />} />
        <Route path={"updatetask"} element={<UpdateEmployeeTask />} />
        <Route path={"updateuser"} element={<UpdateEmployeeInfo />} />
        <Route path="*" element={<UndefinedRoute />} />
        
      </Route>
      <Route path="/login" element={<LoginPage />} />
     </Route>
    )
  );

  const HRRoutes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainPage />}></Route>
          <Route path="services" element={<ServicesPage />} />
          <Route path="updateuser" element={<UpdateEmployeeInfo />} />
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
            <Route path="manage" element={<ManageField />} />
          </Route>

          {/* Sales&Expenses */}
          <Route path="services">
            <Route path="expenses" element={<ExpensesList />} />
            <Route path="expenses/add" element={<AddExpenses />} />
            <Route path="expenses/update" element={<UpdateExpense />} />
            <Route path="email" element={<EmailPage />} />
          </Route>

          {/* Communication */}

          {/* Communication */}
          <Route path="analytics">
            <Route path="manage" element={<ManageAnalytics />} />
            <Route path="user" element={<UserAnalytics />} />
            <Route path="finance" element={<FinanceAnalytics />} />
            <Route path="task" element={<TrackTask />} />
          </Route>

          {/* {Companies Management} */}
          <Route path="services">
            <Route path="companies/view" element={<ViewCompanies />} />
            <Route path="companies/add" element={<AddCompanies />} />
            <Route path="companies/update" element={<UpdateCompany />} />
          </Route>

          <Route path="services">
            <Route path="manage" element={<ViewCompanies />} />
            <Route path="companies/add" element={<AddCompanies />} />
            <Route path="companies/update" element={<UpdateCompany />} />
          </Route>

          <Route path="services">
            <Route path="payment/manage" element={<ManagePayment />} />
            <Route path="payment/add" element={<AddPayment />} />
            <Route path="invoice/add" element={<AddInvoice />} />
            <Route path="invoice/update" element={<UpdateInvoice />} />
            <Route path="payment/view" element={<ViewPayment />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    )
  );

  const routes =
    Role === "HR"
      ? HRRoutes
      : Role === "Employee"
      ? EmployeeRoutes
      : LoginRoutes;

  return <RouterProvider router={routes} />;
}

export default App;
