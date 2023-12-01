import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fetchdata from "../FetchData";
import LoadingSpinner from "../ComponentElement/LoadingSpinner";
import BoxModel from "../ComponentElement/BoxModel";

function SalesList() {
  useEffect(() => {
    GetSalesList();
  }, []);

  const [Data, setData] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [Mes, setMes] = useState("");
  const [Display, setDisplay] = useState("none");
  const Navigate = useNavigate();

  const GetSalesList = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/SalesList"
      );
      if (response.length < 1) {
        setMes("No Record Found");
        setDisplay("flex");
        handelOpenModelBox();
      } else {
        //   console.log(response);
        setFilterData(response);
        setData(response);
        setDisplay("flex");
      }
    } catch (err) {
      setMes(err.message);
    }
  };

  const handleDeleteSale = async (ID) => {
    setMes("");
    try {
      const response = await Fetchdata(
        "post",
        "http://localhost:8080/DeleteSale",
        { ID }
      );
      setMes(response.mes);
      handelOpenModelBox();
      GetSalesList()
    } catch (error) {
      setMes(error.message);
      handelOpenModelBox()
    }
  };

  const handleMonthData = (m) => {
    const filter = FilterData.filter((e) => {
      return e.ExpenseMonth === m;
    });
    setFilterData(filter);
  };

  const ClearAll = () => {
    setFilterData(Data);
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
      <div className="d-flex gap-3 m-2 justify-content-between">
        <h3>Sales Record</h3>

        <div className="d-flex gap-3">
          <button
            className="btn btn-primary rounded-0"
            onClick={() => Navigate("/services/sales/add")}
          >
            Add Sales
          </button>
          <button
            className="btn btn-warning rounded-0 shadow-sm"
            onClick={() => Navigate("/services/expenses")}
          >
            Expense Record
          </button>
        </div>
      </div>
      <dialog
        className=" col-lg-4 col-8 border-0 rounded-2 shadow-sm"
        id="dialog"
      >
        <BoxModel mes={Mes} closeFunc={handelCloseModelBox} />
      </dialog>

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
          <button className="btn btn-success rounded-0" onClick={ClearAll}>
            Clear All
          </button>
        </div>
      </div>

      <div className="d-flex">
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
                <h6 className="h6">Sale By</h6>
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
                      <th>{ele.ProductName}</th>
                      <td>{ele.SaleType}</td>
                      <td>{ele.SaleAmount}</td>
                      <td>{ele.SaleDate}</td>
                      <td>{ele.SaleBy}</td>
                      <td>{ele.SaleMonth}</td>

                      <td>
                        <div className="m-1 p-0">
                          <button
                            className="btn btn-outline-danger m-1 p-1 rounded-0"
                            onClick={() => handleDeleteSale(ele.ID)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-outline-primary p-1 m-1 rounded-0"
                            onClick={() =>
                              Navigate("/services/sales/update", { state: ele })
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

export default SalesList;
