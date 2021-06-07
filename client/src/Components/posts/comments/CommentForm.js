import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../actions/post';

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  return (
    <>
      <div className='post-form my-1'>
        <div className='bg-primary p'>
          <h3>Leave Comment</h3>
        </div>
        <form
          className='form my-1'
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addComment(postId, { text }));
            setText('');
          }}
        >
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Leave Comment'
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </>
  );
};

export default CommentForm;
