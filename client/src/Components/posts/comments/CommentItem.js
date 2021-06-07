import React from 'react';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from '../../../actions/post';

const CommentItem = ({
  comment: { _id, avatar, text, name, user, date },
  postId,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div className='comments'>
      <div className='post bg-white p-1 my-1'>
        <div>
          <a href='profile.html'>
            <img className='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
          </a>
        </div>
        <div>
          <p className='my-1'>{text}</p>
          <p className='post-date'>
            <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
          {!auth.loading && user === auth.user._id && (
            <button
              type='button'
              className='btn btn-danger'
              onClick={(e) => dispatch(deleteComment(postId, _id))}
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
