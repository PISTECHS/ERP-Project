import React from 'react'
import ServicesCards from '../Component/ServicesCards'
function TaskManagerPage() {
  const TaskManagerList = [
    {Title:'Manage Tasks', subTitle:'CRUD Tasks', url:'/services/task/view'},
    {Title:'Manage Team', subTitle:'CRUD Team', url:'/services/task/team'},
    {Title:'Manage Projects', subTitle:'CRUD Projects', url:'/services/project/list'},
    {Title:'Manage Field', subTitle:'CRUD Field', url:'/services/field/manage'},
  ]
  return (
    <>
    <h2 className="h2 text-center p-3" style={{color:'#379683'}}>* Task Management *</h2>
    <div className="d-flex justify-content-center align-items-center flex-wrap m-3">
              {TaskManagerList.map((ele, index) => {
                return (
                  <ServicesCards
                    key={index}
                    Title={ele.Title}
                    subTitle={ele.subTitle}
                    url={ele.url}
                  />
                ); 
              })}
            </div>
    </>
    
  )
}

export default TaskManagerPage