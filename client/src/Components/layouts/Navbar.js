import React from 'react';
import { connect, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/auth';

const Navbar = ({ logout }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const authLinks = (
    <ul>
      <li>
        <NavLink to='/dashboard'>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to='/posts'>Blog</NavLink>
      </li>

      <li>
        <NavLink to='/profiles'>Developers</NavLink>
      </li>
      <li>
        <a onClick={logout}>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <NavLink to='/profiles'>Developers</NavLink>
      </li>

      <li>
        <NavLink to='/register'>Register</NavLink>
      </li>
      <li>
        <NavLink to='/login'>Login</NavLink>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className='navbar bg-dark'>
        <h1>
          <NavLink to='/'>
            <i className='fa fa-code'></i> DevConnector
          </NavLink>
        </h1>
        {!loading && <> {isAuthenticated ? authLinks : guestLinks}</>}
      </nav>
    </div>
  );
};

export default connect(null, { logout })(Navbar);
