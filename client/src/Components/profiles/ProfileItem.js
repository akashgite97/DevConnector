import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='developer iamge' className='img-rounded' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} at <span>{company && company}</span>
        </p>
        <p>{location && <span>{location}</span>} </p>
        <Link to={`/profile/${_id}`} className='btn btn-primary my-1'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index}>
            <i className='fa fa-check  text-primary'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
