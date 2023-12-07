import React, { useEffect } from "react";
import Fetchdata from "../Component/FetchData";
import { EmailPageSchema } from "../TaskManagement/ValidationSchemas";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";


const EmailPage = () => {
  useEffect(() => {
    sendEmail();
  }, []);

  const Navigate = useNavigate()

  const sendEmail = async (obj) => {
    let response = await Fetchdata("POST", "http://localhost:8080/sendemail",{
      ...obj 
    });
  };

  const EmailPageValues = {
    Sender: "",
    Reciever: "",
    Subject: "",
    Message: "",
  };

  const formik = useFormik({
    initialValues: EmailPageValues,
    validationSchema: EmailPageSchema,
    onSubmit: (values) => {
      console.log(values);
      // AddTask(values);
      sendEmail(values)
    },
  });

  return (
    <>
      <div className="main">
        <div className="header d-flex justify-content-between m-3">
          <div>
            <h2 className="h2">Email</h2>
          </div>
          <div>  <button
                  className="btn btn-warning rounded-0"
                  onClick={() => Navigate("/services")}
                >
                  Services 
                </button></div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="row d-flex flex-wrap justify-content-between col-lg-11 m-5">
            <div className="col-12 col-lg-6 mt-2 d-flex flex-wrap">
              <div className="col-lg-4 col-12">
                <h6 className="h6 mt-2">Sender Email</h6>
              </div>
              <div className="col-lg-8 col-12">
                <input
                  className="form-control h-100 shadow-sm"
                  type="text"
                  name="Sender"
                  onChange={formik.handleChange}
                  value={formik.values.Sender}
                />
              </div>
              {formik.touched.Sender && formik.errors.Sender ? (
                <div className="text-danger">{formik.errors.Sender}</div>
              ) : null}
            </div>

            <div className="col-12 col-lg-6 mt-2 d-flex flex-wrap">
              <div className="col-lg-4 col-12">
                <h6 className="h6 mt-2">Reciever Email</h6>
              </div>
              <div className="col-lg-8 col-12">
                <input
                  className="form-control h-100 shadow-sm"
                  type="text"
                  name="Reciever"
                  onChange={formik.handleChange}
                  value={formik.values.Reciever}
                />
              </div>
              {formik.touched.Reciever && formik.errors.Reciever ? (
                <div className="text-danger">{formik.errors.Reciever}</div>
              ) : null}
            </div>

            <div className="col-12 col-lg-6 mt-2 d-flex flex-wrap">
              <div className="col-lg-4 col-12">
                <h6 className="h6 mt-2"> Email Subject</h6>
              </div>
              <div className="col-lg-8 col-12">
                <input
                  className="form-control h-100 shadow-sm"
                  type="text"
                  name="Subject"
                  onChange={formik.handleChange}
                  value={formik.values.Subject}
                />
              </div>
              {formik.touched.Subject && formik.errors.Subject ? (
                <div className="text-danger">{formik.errors.Subject}</div>
              ) : null}
            </div>

            <div className="col-12 mt-2 d-flex flex-wrap">
              <div className="col-lg-2 col-12">
                <h6 className="h6 mt-2">Email Message </h6>
              </div>
              <div className="col-lg-10 col-12">
                <textarea
                  className="form-control h-100 shadow-sm"
                  type="text"
                  name="Message"
                  onChange={formik.handleChange}
                  value={formik.values.Message}
                />
              </div>
              {formik.touched.Message && formik.errors.Message ? (
                <div className="text-danger">{formik.errors.Message}</div>
              ) : null}
            </div>
            <div className="text-end mt-2">
              <button className="btn btn-danger shadow-sm" type="submit">Send Email </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmailPage;
