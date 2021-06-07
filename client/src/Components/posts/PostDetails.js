import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPostById } from '../../actions/post';
import Spinner from '../layouts/Spinner';
import CommentForm from './comments/CommentForm';
import CommentItem from './comments/CommentItem';
import PostItem from './PostItem';

const PostDetails = ({ getPostById }) => {
  const { id } = useParams();

  const postData = useSelector((state) => state.post);
  const { post, loading } = postData;

  useEffect(() => {
    getPostById(id);
  }, []);

  return loading && post == null ? (
    <Spinner />
  ) : (
    <>
      <Link to='/posts' className='btn btn-light '>
        Back to Posts
      </Link>
      <CommentForm postId={post._id} />
      <PostItem posts={post} showActions={false} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </>
  );
};

export default connect(null, { getPostById })(PostDetails);
