import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addExperience } from '../../actions/profile';

const AddExperience = () => {
  const [formData, setFormdata] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    decription: '',
  });

  const { title, company, location, from, to, current, decription } = formData;
  const [dateDisable, setDateDisable] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addExperience(formData));
  };

  return (
    <>
      <section className='container'>
        <h1 className='large text-primary'>Add An Experience</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className='form'>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Job Title'
              name='title'
              required
              value={title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Company'
              name='company'
              required
              value={company}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input
              type='date'
              name='from'
              value={from}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <p>
              <input
                type='checkbox'
                name='current'
                checked={current}
                value={current}
                onChange={(e) => {
                  setFormdata({ current: !current });
                  setDateDisable(!dateDisable);
                }}
              />{' '}
              Current Job
            </p>
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input
              type='date'
              name='to'
              value={to}
              disabled={dateDisable ? 'disabled' : ''}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <textarea
              name='decription'
              cols='30'
              rows='5'
              placeholder='Job Description'
              value={decription}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <input
            type='submit'
            className='btn btn-primary my-1'
            onClick={onSubmit}
          />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </section>
    </>
  );
};

export default AddExperience;
