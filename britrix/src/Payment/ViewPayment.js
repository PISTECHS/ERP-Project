import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Fetchdata from "../Component/FetchData";
import LoadingSpinner from "../Component/ComponentElement/LoadingSpinner";
import BoxModel from "../Component/ComponentElement/BoxModel";


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

  const GetPaymentRecord = async () => {
    try {
      const resp = await Fetchdata(
        "POST",
        "http://localhost:8080/filterpaymentrecord",
        { InvoiceID: Data.InvoiceID }
      );
      if (resp.length < 1) {
        setMes("No Record Found");
        setDisplay("none");
        handelOpenModelBox();
      } else {
        // console.log(resp);
        // setMes(resp.mes);
        setPaymentRecord(resp)
        setDisplay("none");
        const totalPayment = [...resp].reduce((total, nextammount) => {
            return total + parseInt(nextammount.PaymentAmmount, 10);
        }, 0)
        // setFilterPaymentRecord(resp)
        setRecoverAmount(totalPayment)
      }
     
    } catch (err) {
      console.log(err.message);
      setMes(err.message);
      handelOpenModelBox();
      setDisplay("none");
    }
  };

  const handleDeletePayment = async(PaymentID) => {
    try {
      const resp = await Fetchdata(
        "POST",
        "http://localhost:8080/deletepayment",
        { PaymentID}
      );
      setMes(resp.mes);
      handelOpenModelBox();
      GetPaymentRecord()
    }
    catch (err) {
      console.log(err.message);
      setMes(err.message);
      handelOpenModelBox();
      setDisplay("none");
    }
  }
  
  const handelOpenModelBox = () => {
    let dialogElem = document.getElementById("dialog");
    dialogElem.showModal();
  };

  const handelCloseModelBox = () => {
    let dialogElem = document.getElementById("dialog");
    dialogElem.close();
  };

  return (
    <>
      <dialog
        className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
        id="dialog"
      >
        <BoxModel mes={Mes} closeFunc={handelCloseModelBox} />
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
