import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Fetchdata from "../FetchData";


function ExpensesList() {
  useEffect(() => {
      GetTaskList()
    }, [])

    const [Data, setData] = useState([]);
    const [FilterData, setFilterData] = useState([]);
    const [Mes, setMes] = useState('')
    const Navigate = useNavigate();
    const [Display, setDisplay] = useState('none')

    const GetTaskList = async () => {
      try {
        const response = await Fetchdata("GET", "http://localhost:8080/ExpensesList");
        if(response.length<1){
          setMes('No Record Found')
        }else{
        //   console.log(response);
          setData(response)
          setFilterData(response)
          setDisplay('flex')
        }
      } catch (err) {
        setMes(err.message)
      }
    };

    const handleDeleteTask = async (ID) => {
      setMes('')
      try {
        const response = await Fetchdata("post", "http://localhost:8080/DeleteExpense", {ID});
         setMes(response.mes)
      } catch (error) {
        setMes(error.message)
      }
    }

    const handleMonthData = (m) => {
        const filter = FilterData.filter((e) => {
          return(
            e.ExpenseMonth === m
         )
        })
        setFilterData(filter)
    }

    const ClearAll = () => {
      setFilterData(Data)
    }

  return (
    <>
      <div className="d-flex gap-3 m-2 justify-content-between">
        <h3>Expense Record</h3>

        <div className="d-flex gap-3">
          <button className="btn btn-primary rounded-0" onClick={() => Navigate('/services/expenses/add')}>Add Expense</button>
          <button className="btn btn-warning rounded-0 shadow-sm" onClick={() => Navigate('/services/sales')}>
            Sales Record
          </button>
        </div>
      </div>
      <div className={`d-${Display} m-4 justify-content-center gap-2`}>
        <div><h6 className="h6 p-2">Month</h6></div>
        <div><input
            className="form-control shadow-sm"
            onChange={(e) => handleMonthData(e.target.value)}
            type="month"
          /></div>
           <div><button className="btn btn-success rounded-0" onClick={ClearAll}>Clear All</button></div>
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
                    
                      <td><div className="m-1 p-0"><button className="btn btn-outline-danger m-1 p-1 rounded-0"
                      onClick={() => handleDeleteTask(ele.ID)}
                      >Delete</button><button className="btn btn-outline-primary p-1 m-1 rounded-0"
                      onClick={() => Navigate('/services/expenses/update', {state: ele})}
                      >Update</button></div>
                      </td> 
                      </tr>
                    </>
                  );
                })}
          </tbody>
        </table>
      </div>
      {Mes && <div className="text-center border-2 p-2 rounded-0">{Mes}</div>}
    </>
  );
}

export default ExpensesList;
