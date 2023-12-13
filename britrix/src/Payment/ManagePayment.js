import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fetchdata from "../Component/FetchData";
import BoxModel, {handelCloseModelBox, handelOpenModelBox} from "../Component/ComponentElement/BoxModel";
import LoadingSpinner from "../Component/ComponentElement/LoadingSpinner";

const ManagePayment = () => {
  useEffect(() => {
    GetPaymentList();
  }, []);

  const [Data, setData] = useState([])
  const [FilterData, setFilterData] = useState([])
  const [Mes, setMes] = useState('')
  const [Display, setDisplay]  = useState('flex');
  const Navigate = useNavigate();


  const OpenBox = (value) => {
    setMes("")
     if(typeof value === 'string'){
      setMes(value);
      handelOpenModelBox("dialog");
      setDisplay("none");
     }else{
      setData(value);
      setFilterData(value);
      setDisplay("none");
     }
  }

  const GetPaymentList = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/registerpaymentlist"
      );
      if (response.length < 1) {
        OpenBox("No Record Found")
      } else {
        OpenBox(response)
      }
    } catch (err) {
      OpenBox(err.message)
    }
  };

  const handleDeleteFunc = async (InvoiceID) => {
    try {
      const response = await Fetchdata(
        "POST",
        "http://localhost:8080/deleteinvoice",
        { InvoiceID }
      );
      OpenBox(response.mes)
      
    } catch (err) {
        OpenBox(err.message)
    }
  };


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
        <BoxModel mes={Mes} closeFunc={() => handelCloseModelBox("dialog")} />
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
