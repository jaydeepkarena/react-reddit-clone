import { requestPosts, receivedPosts, receivedError } from '../actions';
import API from '../../utils/api'

const getPosts = () => {
  return (dispatch, getState) => {
    dispatch(requestPosts());

    API
      .get('posts')
      .then(res => dispatch(receivedPosts(res.data)))
      .catch(err => dispatch(receivedError(err.response.data)));
  };
};

export default getPosts;
