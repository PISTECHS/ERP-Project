import * as Yup from 'yup';
export const RegisterUserSchema = Yup.object({
    EmpName: Yup.string().required('Name is Required'),
    // EmpID: Yup.string().required('Exployee ID is Required'),
    EmpType: Yup.string().required('Employee Type is Required'),
    EmpField: Yup.string().required('Expertise is Required'),
    EmpEmail: Yup.string().email().required('Email is Required'),
    EmpContactNo: Yup.number().required('Type is Required'),
    EmpPosition: Yup.string().required('Position is Required'),
    EmpStatus: Yup.string().required('Status is Required'),
    // EmpUsername: Yup.string().required('Username is Required'),
    // EmpPassword: Yup.string().required('Password is Required'),
});

export const RegisterTaskSchema = Yup.object({
    TaskID: Yup.string().required('ID is Required'),
    TaskName: Yup.string().required('Name is Required'),
    TaskField: Yup.string().required('Field is Required'),
    TaskDuration: Yup.string().required('Duration is Required'),
    TaskAllocation: Yup.string().required('Team is Required'),
    StartDate: Yup.date().required('Start Date is Required'),
    EndDate: Yup.date().required('End Date is Required'),
    Progress: Yup.number().min(0).max(100).required('Progress is Required'),
    ProjectName: Yup.string().required('Project Name is Required'),
    Type: Yup.string().required('Types is Required'),
    Summary: Yup.string().required('Summary is Required'),
    Priority: Yup.string().required('Priority is Required'),
    Month: Yup.string().required('Month is Required'),
    // EmpUsername: Yup.string().required('Username is Required'),
    // EmpPassword: Yup.string().required('Password is Required'),
});

export const RegisterProjectSchema = Yup.object({
    // ProjectID: Yup.string().required('ID is Required'),
    ProjectName: Yup.string().required('Name is Required'),
    ProjectField: Yup.string().required('Field is Required'),
    ProjectSummary: Yup.string().required('Summary is Required'),
    ProjectDuration: Yup.string().required('Duration is Required'),
    StartDate: Yup.date().required('Start Date is Required'),
    EndDate: Yup.date().required('End Date is Required'),
    Month: Yup.string().required('Month is Required'),
    Progress: Yup.number().min(0).max(100).required('Progress is Required'),
    Company: Yup.string().required('Company is Required'),
    ProjectStatus: Yup.string().required('Status is Required'),
});


export const RegisterFieldSchema = Yup.object({
    FieldName: Yup.string().required('Name is Required'),
});

export const ExpenseSchema = Yup.object({
    ExpenseName: Yup.string().required('Name is Required'),
    ExpenseMonth: Yup.string().required('Month is Required'),
    ExpenseDate: Yup.string().required('Date is Required'),
    ExpenseAmount:Yup.number().positive().required('Ammount is Required'),
    ExpenseType: Yup.string().required('Type is Required'),
    AddBy: Yup.string().required('Add By is Required'),
});


export const SalesSchema = Yup.object({
    ProductName: Yup.string().required('Name is Required'),
    SaleMonth: Yup.string().required('Month is Required'),
    SaleDate: Yup.string().required('Date is Required'),
    SaleAmount: Yup.number().positive().required('Ammount is Required'),
    SaleType: Yup.string().required('Type is Required'),
    SaleBy: Yup.string().required('Sale By is Required'),
});