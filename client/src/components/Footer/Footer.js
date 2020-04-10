import React from 'react';

import './styles.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <span className="username">@nemanjam 2020</span>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=nemanjam&repo=mern-boilerplate&type=star&count=true&size=large"
          frameBorder="0"
          scrolling="0"
          width="160px"
          height="30px"
        ></iframe>
      </div>
    </div>
  );
};

export default Footer;
