import React, { useState } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";
import Fetchdata from "./Component/FetchData";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const [Mes, setMes] = useState('')
    const Navigate = useNavigate()
    const handleLogin = async(obj) => {
        setMes('')
        console.log(obj);
        try {
            const response = await Fetchdata("post", "http://localhost:8080/userlogin", obj);
             console.log(response);
            if(response.success === false){
                setMes(response.mes)
            }else{
                Navigate('/')
            }

          } catch (error) {
             console.log(error.message);
          }
    }

    const LoginUserSchema = Yup.object({
        EmpEmail: Yup.string().email().required('Email is Required'),
        EmpPass: Yup.string().required('Password is Required'),
    });
    
    const LoginUserValues = {
        EmpEmail : '',
        EmpPass: '', 
    };
    const formik = useFormik({
        initialValues: LoginUserValues,
        validationSchema: LoginUserSchema,
        onSubmit: (values) => {
        //   console.log(values);
          handleLogin(values)
        },
      });

  return (
    <>
       <div className="px-4 py-5 px-md-5 px-sm-6 text-center text-lg-start">
       <form onSubmit={formik.handleSubmit}>
        <div className="container d-flex justify-content-center p-3">
        
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card shadow-lg p-4 rounded-0">
            <h2 className="text-center">BitriX</h2>
              <h3 className="h3 text-center" style={{color:'#379683'}}>Dashboard Login</h3>
              <div className="card-body m-3">
                <div className="form-outline mb-4">
                <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    name='EmpEmail'
                    value={formik.values.EmpEmail}
                    onChange={formik.handleChange}
                  />
                  {
                    formik.touched.EmpEmail && formik.errors.EmpEmail ? (
                    <div className="text-danger">{formik.errors.EmpEmail}</div>
                  ) : null
                  }
                </div>

                <div className="form-outline mb-4">
                <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control shadow-sm"
                    name="EmpPass"
                    value={formik.values.EmpPass}
                    onChange={formik.handleChange}
                  />
                 {
                    formik.touched.EmpPass && formik.errors.EmpPass ? (
                    <div className="text-danger">{formik.errors.EmpPass}</div>
                  ) : null
                  }
                </div>
                
                <div className="text-center">
                {Mes && <div className="border border-2 p-2 m-2">{Mes}</div>}
                  <button
                    type="submit"
                    className="btn btn-danger btn-block mb-4 p-2 ps-3 pe-3 shadow-sm border-0 rounded-0"
                    style={{backgroundColor:'#8EE4AF'}}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
  
        </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
