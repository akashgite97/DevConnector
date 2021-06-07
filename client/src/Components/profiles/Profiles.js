import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = () => {
  const dispatch = useDispatch();
  const profiledata = useSelector((state) => state.profile);
  const { loading, profiles } = profiledata;

  useEffect(() => {
    dispatch(getProfiles);
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='text-primary large'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'>
              Browse and connect with developers
            </i>
          </p>
          <div className='profiles'>
            {profiles.length > 0
              ? profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              : 'No profile found'}
          </div>
        </>
      )}
    </div>
  );
};

export default connect(null, getProfiles)(Profiles);
