import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import Fetchdata from '../../Component/FetchData';
import { SalesSchema } from '../../TaskManagement/ValidationSchemas';

const UpdateSales = () => {

  const [Mes, setMes] = useState('')
  const location= useLocation()
  const Naviagte = useNavigate()

  const UpdateData = async(obj) => {
    // console.log(obj);
     setMes('')
     try{
      let response = await Fetchdata("post", "http://localhost:8080/UpdateSales", obj)
      console.log(response);
       setMes(response.mes)
     }
     catch(err){
      console.log(err.message);
     }
  }

  

  const SalesValues = {
    ...location.state
  };

 
  const formik = useFormik({
    initialValues: SalesValues,
    validationSchema: SalesSchema,
    onSubmit: (values) => {
      UpdateData(values)
    },
  });
  return (
    <>
     <div className="conatainer m-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="card shadow-lg rounded-0 m-3 p-4">
            <div className=" d-flex flex-wrap col-12 m-3 justify-content-between">
              <div>
                {" "}
                <h4 className="h4">Update Sales</h4>
              </div>
              <div>
                <button
                  className="btn btn-danger rounded-0"
                  onClick={() => Naviagte('/services/sales')}
                >
                  Sale List
                </button>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">ID</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="ID"
                      onChange={formik.handleChange}
                      value={formik.values.ID}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Product Name</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="ProductName"
                      onChange={formik.handleChange}
                      value={formik.values.ProductName}
                    />
                  </div>

                  {formik.touched.ProductName && formik.errors.ProductName ? (
                    <div className="text-danger">
                      {formik.errors.ProductName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Sale Type</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <select
                      name="SaleType"
                      className="form-control shadow-sm"
                      onChange={formik.handleChange}
                      value={formik.values.SaleType}
                    >
                      <option className="dropdown-item" value="">
                        --Choose an option--
                      </option>
                      <option className="dropdown-item" value="FixedExpense">
                        Fixed Expense
                      </option>
                      <option className="dropdown-item" value="SavingExpense">
                        Saving Expense
                      </option>
                    </select>
                  </div>
                  {formik.touched.SaleType && formik.errors.SaleType ? (
                    <div className="text-danger">
                      {formik.errors.SaleType}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Date</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="date"
                      name="SaleDate"
                      onChange={formik.handleChange}
                      value={formik.values.SaleDate}
                    />
                  </div>
                  {formik.touched.SaleDate && formik.errors.SaleDate ? (
                    <div className="text-danger">
                      {formik.errors.SaleDate}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row d-flex flex-wrap col-12 mt-2">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Sale Month</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="month"
                      name="SaleMonth"
                      onChange={formik.handleChange}
                      value={formik.values.SaleMonth}
                    />
                  </div>
                  {formik.touched.SaleMonth && formik.errors.SaleMonth ? (
                    <div className="text-danger">
                      {formik.errors.SaleMonth}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Sale Amount</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="SaleAmount"
                      onChange={formik.handleChange}
                      value={formik.values.SaleAmount}
                    />
                  </div>
                  {formik.touched.SaleAmount &&
                  formik.errors.SaleAmount ? (
                    <div className="text-danger">
                      {formik.errors.SaleAmount}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="row d-flex flex-wrap col-12 mt-2">
              <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Sale By</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="text"
                      name="SaleBy"
                      onChange={formik.handleChange}
                      value={formik.values.SaleBy}
                    />
                  </div>
                  {formik.touched.SaleBy && formik.errors.SaleBy ? (
                    <div className="text-danger">
                      {formik.errors.SaleBy}
                    </div>
                  ) : null}
                </div>
              </div>
              
              <div className="m-5 text-center">
                {Mes && <div className="border border-2 p-2 m-2">{Mes}</div>}
                <button
                  className="btn btn-primary border-0 shadow-sm rounded-0"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateSales