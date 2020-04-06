import React from 'react';

import './styles.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <span className="username">@nemanjam 2020</span>
        {/* Place this tag where you want the button to render. */}
        <a
          class="github-button"
          href="https://github.com/nemanjam/mern-boilerplate"
          data-icon="octicon-star"
          data-size="large"
          aria-label="Star nemanjam/mern-boilerplate on GitHub"
        >
          Star
        </a>
      </div>
    </div>
  );
};

export default Footer;
