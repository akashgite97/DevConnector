import React from 'react';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <>
      <div class='profile-about bg-light p-2'>
        <h2 class='text-primary'>{name.trim().split(' ')[0]}</h2>
        <p>{bio}</p>
        <div class='line'></div>
        <h2 class='text-primary'>Skill Set</h2>
        <div class='skills'>
          {skills.map((skill, index) => (
            <div class='p-1' key={index}>
              <i class='fa fa-check'></i>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileAbout;
