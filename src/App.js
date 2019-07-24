import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import './App.css';
import getPosts from './store/reducers/getPosts';

const App = ({ getPosts, posts, error, loading }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">ERRROROROROR</div>;

  return <div className="Posts">Posts found...</div>;
};

const mapStateToProps = state => ({
  posts: state.posts.posts,
  loading: state.posts.loading,
  error: state.posts.error
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
