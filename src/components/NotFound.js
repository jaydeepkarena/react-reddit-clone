import React from 'react';

const style = {
  display: 'flex',
  'align-items':'center',
  'justify-content':'center',
  'padding-top': '100px'

}

const NotFound = () => (
  <h1 class="not-found" style={style}>Oops...The page you requested was not found...</h1>
);

export default NotFound;
