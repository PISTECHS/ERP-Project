import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fetchdata from "../Component/FetchData";
import BoxModel,{handelCloseModelBox, handelOpenModelBox} from "../Component/ComponentElement/BoxModel";
import LoadingSpinner from "../Component/ComponentElement/LoadingSpinner";

function ExpensesList() {
  useEffect(() => {
    GetExpenseList();
  }, []);

  const [Data, setData] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [Mes, setMes] = useState("");
  const Navigate = useNavigate();
  const [Display, setDisplay] = useState("none");
  

  const OpenBox = (value) => {
    setMes("")
     if(typeof value === 'string'){
      setMes(value);
      handelOpenModelBox("dialog");
      setDisplay("flex");
     }else{
      setData(value);
      setFilterData(value);
      setDisplay("flex");
     }
  }

  const GetExpenseList = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/ExpensesList"
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
  
  const handleDeleteTask = async (ID) => {
    try {
      const response = await Fetchdata(
        "post",
        "http://localhost:8080/DeleteExpense",
        { ID }
      );
      OpenBox(response.mes)
      GetExpenseList();
    } catch (error) {
      OpenBox(error.message);
    }
  };

  const handleMonthData = (m) => {
    setFilterData(
      [...Data].filter((e) => {
        return e.ExpenseMonth === m;
      })
    );
  };

 

  return (
    <>
      <div className="d-flex gap-3 m-2 justify-content-between">
        <h3>Expense Record</h3>

        <div className="d-flex gap-3">
          <button
            className="btn btn-primary rounded-0"
            onClick={() => Navigate("/services/expenses/add")}
          >
            Add Expense
          </button>
        </div>
      </div>

      <div className={`d-${Display} m-4 justify-content-center gap-2`}>
        <div>
          <h6 className="h6 p-2">Month</h6>
        </div>
        <div>
          <input
            className="form-control shadow-sm"
            onChange={(e) => handleMonthData(e.target.value)}
            type="month"
          />
        </div>
        <div>
          <button className="btn btn-success rounded-0" onClick={() =>  setFilterData(Data)}>
            Clear All
          </button>
        </div>
      </div>
      <div className="d-flex">
        <dialog
          className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
          id="dialog"
        >
          <BoxModel mes={Mes} closeFunc={() => handelCloseModelBox("dialog")} />
        </dialog>
        <table className="table shadow-sm  table-bordered m-3">
          <thead className="table-light text-center " key={"thead"}>
            <tr className="mb-2">
              <th scope="col">
                <h6 className="h6">Name</h6>
              </th>

              <th scope="col">
                <h6 className="h6">Type</h6>
              </th>
              <th scope="col">
                <h6 className="h6">Amount</h6>
              </th>
              <th scope="col">
                <h6 className="h6">Date</h6>
              </th>
              <th scope="col">
                <h6 className="h6">Add By</h6>
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
                      <th>{ele.ExpenseName}</th>
                      <td>{ele.ExpenseType}</td>
                      <td>{ele.ExpenseAmount}</td>
                      <td>{ele.ExpenseDate}</td>
                      <td>{ele.AddBy}</td>
                      <td>{ele.ExpenseMonth}</td>

                      <td>
                        <div className="m-1 p-0">
                          <button
                            className="btn btn-outline-danger m-1 p-1 rounded-0"
                            onClick={() => handleDeleteTask(ele.ID)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-outline-primary p-1 m-1 rounded-0"
                            onClick={() =>
                              Navigate("/services/expenses/update", {
                                state: ele,
                              })
                            }
                          >
                            Update
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
          Display === "flex" ? "none" : "flex"
        } justify-content-center`}
      >
        <LoadingSpinner />
      </div>
    </>
  );
}

export default ExpensesList;
