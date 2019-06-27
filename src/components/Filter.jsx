import React, { useContext } from 'react';
import { FilterContext } from './Todo';

const Filter = () => {
  const dispatch = useContext(FilterContext);
  return (
    <>
      <button onClick={() => dispatch({ type: 'SHOW_ALL' })}>All</button>
      <button onClick={() => dispatch({ type: 'SHOW_COMPLETE' })}>
        COMPLETE
      </button>
      <button onClick={() => dispatch({ type: 'SHOW_INCOMPLETE' })}>
        INCOMPLETE
      </button>
    </>
  );
};
