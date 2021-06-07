import React, { useEffect } from 'react';
import { deleteAccount, getProfile } from '../actions/profile';
import { connect, useDispatch, useSelector } from 'react-redux';
import Spinner from '../Components/layouts/Spinner';
import { Link } from 'react-router-dom';
import DashboardAction from './DashboardAction';
import ExperienceDetails from '../Components/Profile/ExperienceDetails';
import EducationDetails from '../Components/Profile/EducationDetails';

const Dashboard = ({ getProfile }) => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);

  const { user } = auth;
  const { loading, profile } = profiles;

  useEffect(() => {
    getProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead '>Welcome: {user.name}</p>
      {profile !== null ? (
        <>
          <DashboardAction />
          {profile.experience === '' ? (
            'No Exp Added'
          ) : (
            <ExperienceDetails experience={profile.experience} />
          )}
          <EducationDetails education={profile.education} />
          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={dispatch(deleteAccount)}
            >
              Delete Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, Please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfile })(Dashboard);
