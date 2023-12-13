import React from 'react'
import { Outlet } from 'react-router-dom'
import EmployeeNavbar from './EmployeeNavbar'


const RootEmployeePage = () => {
  return (
   <> 
      <EmployeeNavbar />
      <Outlet />
   </>
  )
}

export default RootEmployeePage