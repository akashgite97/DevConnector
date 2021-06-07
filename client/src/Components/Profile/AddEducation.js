import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addEducation } from '../../actions/profile';

const AddEducation = () => {
  const [formData, setFormdata] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    decription: '',
  });

  const { school, degree, fieldofstudy, from, to, current, decription } =
    formData;
  const [dateDisable, setDateDisable] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addEducation(formData));
  };

  return (
    <>
      <section className='container'>
        <h1 className='large text-primary'>Add An Education</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add Educaion
        </p>
        <small>* = required field</small>
        <form className='form'>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* School'
              name='school'
              required
              value={school}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Degree'
              name='degree'
              required
              value={degree}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Field of Study'
              name='fieldofstudy'
              value={fieldofstudy}
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
              Current
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
              placeholder='Description'
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

export default AddEducation;
