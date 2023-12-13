import React from 'react'
import { Link } from 'react-router-dom';
const EmployeeNavbar = () => {
    return (
        <>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <div className="h3 d-flex flex-wrap">BritriX  <h6 className="h6">Employee</h6> </div>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  
                  
                  <li className="nav-item">
                    <Link className="nav-link acive" aria-current="page" href="#" to={'/'}>
                      Services
                    </Link>  
                  </li>
                </ul>
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2 rounded-0 shadow-sm"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success rounded-0 shadow-sm" type="submit">
                    Search
                  </button>  
                </form>
                <div className="logout ms-2">
                <Link className="btn btn-danger border-0 rounded-0 shadow-sm" to={'/login'} style={{backgroundColor: '#5cdb9f'}}>
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        
        </>
      );
}

export default EmployeeNavbar