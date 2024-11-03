import React from 'react';
import logo from '../../data/assets/icons/logo .svg';
import { useAuthContext } from '../../Contexts/AuthContext';
import cart_img from '../../data/assets/icons/cart.png';
import user_img from '../../data/assets/icons/user.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const { logOut } = useAuthContext();
  
  const handleLogin = () => {
    navigate('auth/register');
  };

  const handleCart = () => {
    navigate('/cart');
  };

  const handleLogout = () => {
    logOut();
    navigate('auth/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const { state } = useAuthContext();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* Logo Section */}
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Company Logo" style={{ height: '40px' }} />
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links Section */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='products'>Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='my-orders'>My Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/favorites'>Favorites</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">Contact Us</Link>
              </li>
            </ul>

            {/* Cart and User Icons */}
            <div className="d-flex">
              <img
                src={cart_img}
                width={"45px"}
                onClick={state.isAuthenticated ? handleCart : handleLogin}
                className="m-2"
                alt="Shopping Cart"
              />
              <img
                src={user_img}
                width={"45px"}
                onClick={state.isAuthenticated ? handleProfile : handleLogin}
                className="m-2"
                alt="User Profile"
              />
            </div>

            {/* Button Section */}
            {state.isAuthenticated ? (
              <button className="btn btn-dark" onClick={handleLogout} type="button">
                Logout
              </button>
            ) : (
              <button className="btn btn-dark" onClick={handleLogin} type="button">
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
