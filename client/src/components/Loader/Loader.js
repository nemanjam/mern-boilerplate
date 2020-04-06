import React from 'react';

import './styles.css';

const Loader = (props) => {
  return (
    <div className="loader-container loader" {...props}>
      <h3 className="loader-content">Loading..</h3>
    </div>
  );
};

export default Loader;
