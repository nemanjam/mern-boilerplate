import React from 'react';
import Navbar from '../components/Navbar/Navbar';

import PropTypes from 'prop-types';
import './styles.css';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="content">{children}</div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
