import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import { PropTypes } from 'prop-types';

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect is logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <section className='container'>
        <div className='card'>
          <div className='card-header'>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
              <i className='fa fa-user'></i> Sign into Your Account
            </p>
          </div>
          <div className='card-body'>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <input type='submit' className='btn btn-primary' value='Login' />
            </form>
            <p className='my-1'>
              Don't have an account? <NavLink to='/register'>Sign Up</NavLink>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

Login.prototype = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(null, { login })(Login);
