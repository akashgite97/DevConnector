import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import ProfileAbout from './ProfileAbout';
import ProfileTop from './ProfileTop';
import ExperienceDetails from './ExperienceDetails';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
const ProfileDetails = ({ getProfileById }) => {
  const { id } = useParams();
  const profiledata = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);

  const { loading, profile } = profiledata;
  const { isAuthenticated, user } = auth;

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById]);

  return (
    <>
      {profile == null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to='/profiles' className='btn btn-light'>
            Bact to Profiles
          </Link>

          {isAuthenticated &&
            auth.loading == false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-primary'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0
                ? profile.experience.map((exp) => (
                    <ProfileExperience key={exp.id} experience={exp} />
                  ))
                : 'No Experience '}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0
                ? profile.education.map((edu) => (
                    <ProfileEducation key={edu.id} education={edu} />
                  ))
                : 'No Education '}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default connect(null, { getProfileById })(ProfileDetails);
