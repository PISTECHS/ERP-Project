import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fetchdata from "../Component/FetchData";
import LoadingSpinner from "../Component/ComponentElement/LoadingSpinner";
import BoxModel from "../Component/ComponentElement/BoxModel";


const FinanceAnalytics = () => {
  const [ExpenseRecord, setExpenseRecord] = useState([]);
  const [SalesRecord, setSalesRecord] = useState([]);
  const [FilterSaleRecordValue, setFilterSaleRecordValue] = useState([]);
  const [FilterExpenseRecordValue, setFilterExpenseRecordValue] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [CardDisplay, setCardDisplay] = useState("d-flex");
  const [TotalExpense, setTotalExpense] = useState(0);
  const [TotalSales, setTotalSales] = useState(0);
  const [FilterExpenseRecord, setFilterExpenseRecord] = useState([]);
  const [FilterSalesRecord, setFilterSalesRecord] = useState([]);
  const [Month, setMonth] = useState("");
  const [Mes, setMes] = useState('')
  const profitOrLoss = Math.abs(TotalSales - TotalExpense);
  const inPercentage = ((profitOrLoss / TotalSales) * 100).toFixed(2);

  const Navigate = useNavigate();

  useEffect(() => {
    MainRun();
  }, []);

  const MainRun = () => {
    GetSalesList();
    GetExpenseList();
  };
  
  const SalesValuesGenerate = (response) => {
    let SalesObj = [
      {
        totalSalesAmmount: response.reduce((acc, ele) => {
          acc += parseInt(ele.TotalPayment, 10) || 0;
          return acc;
        }, 0),
        totalSales: response.filter((ele) => ele.TotalPayment).length,
        FixedSales: response.filter((ele) => ele.SaleType === "FixedExpense")
          .length,
        SavingSales: response.filter((ele) => ele.SaleType === "SavingSales")
          .length,
      },
    ];
    return SalesObj;
  };

  const GetSalesList = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/registerpaymentlist"
      );
      if (response.length < 1) {
        setMes('No Sale Record Found')
        handelOpenModelBox()
        setCardDisplay("d-none");
      } else {
        console.table(response);
        let SalesObj = SalesValuesGenerate(response);
        setCardDisplay("d-none");
        setSalesRecord(SalesObj);
        setFilterSalesRecord(SalesObj);
        setFilterSaleRecordValue(response);
        setTotalSales(SalesObj[0].totalSalesAmmount);
      }
    } catch (err) {
      console.error(err.message);
      setMes(err.message)
      handelOpenModelBox()
    }
  };

 
  const ExpenseValueGenerates = (response) => {
    let ExpenseObj = [
      {
        totalExpenseAmmount: response.reduce((acc, ele) => {
          acc += parseInt(ele.ExpenseAmount, 10) || 0;
          return acc;
        }, 0),
        totalExpense: response.filter((ele) => ele.ExpenseAmount).length,
        FixedExpense: response.filter(
          (ele) => ele.ExpenseType === "FixedExpense"
        ).length,
        SavingExpense: response.filter(
          (ele) => ele.ExpenseType === "SavingExpense"
        ).length,
      },
    ];
    return ExpenseObj;
  };

  const GetExpenseList = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/ExpensesList"
      );
      if (response.length < 1) {
        console.log(response);
        setMes('No Expense Record Found')
        handelOpenModelBox()
        setCardDisplay("d-none");
      } else {
        let ExpenseObj = ExpenseValueGenerates(response);
        setCardDisplay("d-none");
        setExpenseRecord(ExpenseObj);
        setFilterExpenseRecordValue(response);
        setFilterExpenseRecord(ExpenseObj);
        setTotalExpense(ExpenseObj[0].totalExpenseAmmount);
        setLoading(false);
      }
    } catch (err) {
      console.error(err.message);
      setMes(err.message)
      handelOpenModelBox()
    }
  };

  const hanldeMonthRecord = (mn) => {
    setMonth(mn);
    let FilterSale = FilterSaleRecordValue.filter(
      (ele) => ele.Month === mn
    );
    let FilterExpense = FilterExpenseRecordValue.filter(
      (ele) => ele.ExpenseMonth === mn
    );
    let SalesObj = SalesValuesGenerate(FilterSale);
    let ExpenseObj = ExpenseValueGenerates(FilterExpense);
    setFilterExpenseRecord(ExpenseObj);
    setFilterSalesRecord(SalesObj);
    setTotalExpense(ExpenseObj[0].totalExpenseAmmount);
    setTotalSales(SalesObj[0].totalSalesAmmount);
  };

  const clearAll = () => {
    setFilterExpenseRecord(ExpenseRecord);
    setFilterSalesRecord(SalesRecord);
    setTotalExpense(ExpenseRecord[0].totalExpenseAmmount);
    setTotalSales(SalesRecord[0].totalSalesAmmount);
    setMonth("");
  };

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
      <div className="main m-4">
        <div className="head d-flex justify-content-between">
          <div>
            {" "}
            <h3>Finance Analytics</h3>
          </div>
          <div className="d-flex gap-2">
            <div>
              <button
                className="btn btn-warning rounded-0"
                onClick={() => Navigate("/services")}
              >
                Services
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary rounded-0"
                onClick={() => Navigate("/analytics/manage")}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>
        <div className="filters d-flex gap-3 m-4 justify-content-center">
          <div>
            <input
              className="form-control h-100 shadow-sm rounded-0"
              type="month"
              name="Month"
              value={Month}
              onChange={(e) => {
                hanldeMonthRecord(e.target.value);
              }}
              disabled={Loading}
            />
          </div>
          <div>
            <button
              className="btn btn-danger shadow-sm rounded-0"
              onClick={() => clearAll()}
              disabled={Loading}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="body d-flex justify-content-center flex-wrap">
          <div className="report d-flex justify-content-center flex-wrap p-3 shadow-sm gap-3">
            <div
              className="card p-2 shadow-sm shadow-sm "
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                {FilterSalesRecord &&
                  FilterSalesRecord.map((ele) => {
                    return (
                      <div className="text-center">
                        <h6 className="h6">
                          {" "}
                          Sales Ammount :{" "}
                          <h3 className="h3 text-success text-bold fw-bold">
                            {" "}
                            {ele.totalSalesAmmount}
                          </h3>
                        </h6>
                        <h6 className="h6"> Total Sales : {ele.totalSales}</h6>
                        <h6 className="h6"> Fixed Sales : {ele.FixedSales}</h6>
                        <h6 className="h6">
                          {" "}
                          Saving Sales : {ele.SavingSales}
                        </h6>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div
              className="card p-2 shadow-sm shadow-sm "
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                {FilterExpenseRecord &&
                  FilterExpenseRecord.map((ele) => {
                    return (
                      <div className="text-center">
                        <h6 className="h6">
                          {" "}
                          Expense Ammount :{" "}
                          <h3 className="h3 text-danger text-bold fw-bold">
                            {" "}
                            {ele.totalExpenseAmmount}
                          </h3>
                        </h6>
                        <h6 className="h6">
                          {" "}
                          Total Expenses : {ele.totalExpense}
                        </h6>
                        <h6 className="h6">
                          {" "}
                          Fixed Expense : {ele.FixedExpense}
                        </h6>
                        <h6 className="h6">
                          {" "}
                          Saving Expense : {ele.SavingExpense}
                        </h6>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div
              className="card p-2 shadow-sm shadow-sm "
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                {!Loading && (
                  <div className="text-center">
                    <h6 className="h6"> Total Sales : {TotalSales}</h6>
                    <h6 className="h6"> Total Expense : {TotalExpense}</h6>
                    {TotalSales > TotalExpense ? (
                      <h2 className="profit">Profit: {inPercentage}%</h2>
                    ) : (
                      <h2 className="loss">Loss: {inPercentage}%</h2>
                    )}

                    <h4 className="amount">Amount: {profitOrLoss}</h4>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${CardDisplay} justify-content-center`}>
        <LoadingSpinner />
      </div>

      <dialog
        className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
        id="dialog"
      >
        <BoxModel mes={Mes} closeFunc={handelCloseModelBox} />
      </dialog>
    </>
  );
};

export default FinanceAnalytics;
