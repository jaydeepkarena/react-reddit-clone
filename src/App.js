import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import './App.css';
import getPosts from './store/reducers/getPosts';

const App = props => {
  useEffect(() => {
    props.getPosts();
  },[]);

  useEffect(() => {
    if (props.error) {
      toast.error(props.error);
    }
  }, [props.error]);

  if (props.loading) return <div className="loading">Loading...</div>;
  if (props.error) return <div className="error">ERRROROROROR</div>;

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
