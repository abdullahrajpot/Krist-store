import React from 'react';
import logo from '../../data/assets/icons/logo .svg';

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo Section */}
          <div className="navbar-brand">
            <a href="#">
              <img src={logo} alt="Krist" style={{ height: '40px' }} />
            </a>
          </div>

          {/* Links Section */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Our Story
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Blogs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Button Section */}
          <button className="btn btn-dark" type="submit">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}
