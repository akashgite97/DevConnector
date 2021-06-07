import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layouts/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = ({ getPosts }) => {
  const post = useSelector((state) => state.post);
  const { posts, loading } = post;

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className='text-primary large'>Posts</h1>
      <p className='lead'>Welcome to community</p>
      <PostForm />
      <div className='posts'>
        {posts.map((post, index) => (
          <>
            <PostItem key={index} posts={post} />
          </>
        ))}
      </div>
    </>
  );
};

export default connect(null, { getPosts })(Posts);
