import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Fetchdata from '../Component/FetchData'


const FinanceAnalytics = () => {
  
  const Navigate = useNavigate()
  
  useEffect(() => {
    MainRun()
  },[])
  
  const MainRun = () => {
    GetSalesList()
  }

  const GetSalesList = async () => {
    try {
      const response = await Fetchdata(
        "GET",
        "http://localhost:8080/SalesList"
      );
      if (response.length < 1) {
        console.log(response);
      } else {
          console.log(response);
     
      }
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <>
        <div className="main m-4">
        <div className="head d-flex justify-content-between">
          <div>
            {" "}
            <h3> Finance Analytics</h3>
          </div>
          <div>
            <button className="btn btn-warning rounded-0">Services</button>
          </div>
        </div>
        </div>
    </>
  )
}

export default FinanceAnalytics