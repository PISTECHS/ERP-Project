import React from 'react'

const EmailPage = () => {
  return (
    <>
        <div className="main">
            <div className="header d-flex justify-content-around m-2">
                 <div><h2 className='h2'>Email</h2></div>
            </div>
  
            <div className="row d-flex flex-wrap justify-content-center col-lg-11 m-5">
                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Sender Email</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="email"
                      name="Sender"
                    />
                  </div>
                </div>

                <div className="col-12 col-lg-6 mt-1 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Reciever Email</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <input
                      className="form-control h-100 shadow-sm"
                      type="email"
                      name="Reciever"
                    />
                  </div>
                </div> 

                <div className="col-12 m-2 d-flex flex-wrap">
                  <div className="col-lg-4 col-12">
                    <h6 className="h6 mt-2">Mssage</h6>
                  </div>
                  <div className="col-lg-8 col-12">
                    <textarea
                      className="form-control h-100 shadow-sm"
                      type="email"
                      name="message"
                    />
                  </div>
                </div> 
                <div className='text-end'><button className='btn btn-danger shadow-sm'>Send Email </button></div>
              </div>
              
                  
           
        </div>
    </>
  )
}

export default EmailPage