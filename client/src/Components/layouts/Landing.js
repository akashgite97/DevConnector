import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

export default function Landing() {
  const isAuthenticated = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Developer Connector</h1>
            <p className='lead'>
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>
            <div className='buttons'>
              <NavLink to='/register' className='btn btn-primary'>
                Sign Up
              </NavLink>
              <NavLink to='/login' className='btn btn-light'>
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
