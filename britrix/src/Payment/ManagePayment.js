import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fetchdata from "../Component/FetchData";
import BoxModel from "../Component/ComponentElement/BoxModel";
import LoadingSpinner from "../Component/ComponentElement/LoadingSpinner";



const ManagePayment = () => {
  useEffect(() => {
    GetPaymentList();
  }, []);


  const [FilterData, setFilterData] = useState([])
  const [Mes, setMes] = useState('')
  const [Display, setDisplay]  = useState('flex');
  const Navigate = useNavigate();

  const GetPaymentList = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/registerpaymentlist"
      );
      if (response.length < 1) {
        setMes("No Record Found");
        setDisplay("none");
        handelOpenModelBox();
      } else {
        // console.log(response);
        setFilterData(response);
        // setData(response);
        setDisplay("none");
      }
    } catch (err) {
    //   console.log(err.message);
      setMes(err.message);
      handelOpenModelBox();
      setDisplay("none");
    }
  };

 

  const handleDeleteFunc = async (InvoiceID) => {
    try {
      const response = await Fetchdata(
        "POST",
        "http://localhost:8080/deleteinvoice",
        { InvoiceID }
      );
    //   console.log(response.mes);
      setMes(response.mes);
      // setDisplay("flex");
      handelOpenModelBox();
      GetPaymentList()
      
    } catch (err) {
        setMes(err.message);
        handelOpenModelBox();
    }
  };


  const handelOpenModelBox = () => {
    let dialogElem = document.getElementById("dialog");
    dialogElem.showModal();
  }

  const handelCloseModelBox = () => {
    let dialogElem = document.getElementById("dialog");
    dialogElem.close();
  }


  return (
    <>
      <div className="head d-flex justify-content-between flex-wrap m-3">
        <div>
          <h3>Manage Invoices</h3>
        </div>
        <div className="d-flex gap-2">
          <div>
            <button
              className="btn btn-primary rounded-0"
              onClick={() => Navigate("/services/invoice/add")}
            >
              Create Invoice
            </button>
          </div>
          <div>
            <button
              className="btn btn-warning rounded-0"
              onClick={() => Navigate("/services")}
            >
              Services
            </button>
          </div>
        </div>
      </div>
      <dialog
        className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
        id="dialog"
      >
        <BoxModel mes={Mes} closeFunc={handelCloseModelBox} />
      </dialog>
      <div className="d-flex">
        <table className="table shadow-sm  table-bordered m-3">
          <thead className="table-light text-center " key={"thead"}>
            <tr className="mb-2">
              <th scope="col">
                <h6 className="h6">ID</h6>
              </th>

              <th scope="col">
                <h6 className="h6">Company</h6>
              </th>
              <th scope="col">
                <h6 className="h6">Project</h6>
              </th>
              <th scope="col">
                <h6 className="h6">Total Payment</h6>
              </th>
              <th scope="col">
                <h6 className="h6">Status</h6>
              </th>
              <th scope="col">
                <h6 className="h6">Deadline</h6>
              </th>
              <th scope="col">
                <h6 className="h6">Register</h6>
              </th>
              <th scope="col">
                <h6 className="h6">Month</h6>
              </th>
              <th scope="col">
                <h6 className="h6">Option</h6>
              </th>
            </tr>
          </thead>
          <tbody className="border-dark text-center " key={"tbody"}>
            {FilterData &&
              FilterData.map((ele, index) => {
                return (
                  <>
                    <tr key={index}>
                      <th>{ele.InvoiceID}</th>
                      <th>{ele.CompanyName}</th> 
                      <td>{ele.ProjectName}</td>
                      <td>{ele.TotalPayment}</td>
                      <td>{ele.PaymentStatus}</td>
                      <td>{ele.PaymentDeadline}</td>
                      <td>{ele.Date}</td>
                      <td>{ele.Month}</td>
                      <td>
                        <div className="m-1 p-0">
                          <button
                            className="btn btn-outline-danger m-1 p-1 rounded-0"
                            onClick={() => handleDeleteFunc(ele.InvoiceID)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-outline-primary p-1 m-1 rounded-0"
                            onClick={() =>
                              Navigate("/services/invoice/update", {
                                state: ele,
                              })
                            }
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-success p-1 m-1 rounded-0"
                            onClick={() =>
                               Navigate("/services/payment/view", {
                                state: ele,
                              })
                            }
                          >
                            Payment
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
      <div
        className={`d-${
          Display
        } justify-content-center`}
      >
        <LoadingSpinner />
      </div>
    </>
  );
};

export default ManagePayment;
