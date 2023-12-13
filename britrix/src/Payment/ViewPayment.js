import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Fetchdata from "../Component/FetchData";
import LoadingSpinner from "../Component/ComponentElement/LoadingSpinner";
import BoxModel,{handelOpenModelBox, handelCloseModelBox} from "../Component/ComponentElement/BoxModel";


const ViewPayment = () => {
  useEffect(() => {
    GetPaymentRecord();
  }, []);

  const [PaymentRecord, setPaymentRecord] = useState([]);
//   const [FilterPaymentRecord, setFilterPaymentRecord] = useState([]);
  const [Display, setDisplay] = useState("flex");
  const [RecoverAmount, setRecoverAmount] = useState()
  const [Mes, setMes] = useState('')
  const Navigate = useNavigate();
  const location = useLocation();
  const Data = location.state;


  const OpenBox = (value) => {
    setMes("");
    if (typeof value === "string") {
      setMes(value);
      handelOpenModelBox("dialog");
      setDisplay("none");
    } else {
      setDisplay("none");
    }
  };

   const GetPaymentRecord = async () => {
    try {
      const resp = await Fetchdata(
        "POST",
        "http://localhost:8080/filterpaymentrecord",
        { InvoiceID: Data.InvoiceID }
      );
      if (resp.length < 1) {
        OpenBox("No Record Found")
      } else {
        setPaymentRecord(resp)
        setDisplay("none");
        const totalPayment = [...resp].reduce((total, nextammount) => {
            return total + parseInt(nextammount.PaymentAmmount, 10);
        }, 0)
        setRecoverAmount(totalPayment)
      }
     
    } catch (err) {
      OpenBox(err.message)
    }
  };

  const handleDeletePayment = async(PaymentID) => {
    try {
      const resp = await Fetchdata(
        "POST",
        "http://localhost:8080/deletepayment",
        { PaymentID}
      );
      OpenBox(resp.mes);
      GetPaymentRecord()
    }
    catch (err) {
      OpenBox(err.message);
    }
  }

  return (
    <>
      <dialog
        className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
        id="dialog"
      >
        <BoxModel mes={Mes} closeFunc={() => handelCloseModelBox("dialog")} />
      </dialog>
      <div className="head d-flex justify-content-between flex-wrap m-3">
        <div className="d-flex gap-2 flex-wrap m-1">
          <div>
            {" "}
            <h3>Manage Payments</h3>
          </div>
          <div>
            <button
              className="btn btn-success rounded-0"
              onClick={() =>
                Navigate("/services/payment/add", {
                  state: Data,
                })
              }
            >
              Add New Payment
            </button>
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap m-1">
          <div>
            <button
              className="btn btn-primary rounded-0"
              onClick={() => Navigate("/services/payment/manage")}
            >
              View Invoices
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
      <div className=" text-center d-flex gap-3 flex-wrap m-3 justify-content-center">
            <div className="card p-2">Total Payment : <b>{Data.TotalPayment}</b></div>
            <div className="card p-2">Payable Amount : <b>{RecoverAmount}</b></div>
            <div className="card p-2">Due Amount : <b>{RecoverAmount ? Data.TotalPayment - RecoverAmount: 0}</b></div>
      </div>

      <div className="d-flex justify-content-center flex-wrap">
            {
                PaymentRecord && PaymentRecord.map((ele) => {
                    return(
                        <>
                            <div className="card p-2 m-2 shadow-sm">
                                <div className="card-body">
                                   <div><h5 className="h-5"> InvoiceID # : {ele.InvoiceID}</h5></div>
                                   <div><h3 className="h-3">Amount : {ele.PaymentAmmount}</h3></div>
                                   <div><h5 className="h-5"> Type : {ele.PaymentType}</h5></div>
                                   <div><h5 className="h-5"> PaymentID : {ele.PaymentID}</h5></div>
                                   <div><h6 className="h-6"> Add By : {ele.AcceptedBy}</h6></div>
                                   <div><h6 className="h-6"> Date : {ele.Date}</h6></div>
                                    <div><button className="btn btn-danger rounded-0 shadow-sm" onClick={() => handleDeletePayment(ele.PaymentID)}>Delete</button></div>
                                </div>
                            </div>
                        </>
                    )
                })
            }
      </div>
      <div className={`d-${Display} justify-content-center`}>
        <LoadingSpinner />
      </div>
    </>
  );
};

export default ViewPayment;
