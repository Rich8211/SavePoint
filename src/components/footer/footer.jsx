import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

import "font-awesome/css/font-awesome.min.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="links">
        <Link to="/">FAQ</Link> <span>|</span>
        <Link to="/">TERMS</Link> <span>|</span>
        <Link to="/">PRIVACY</Link> <span>|</span>
        <Link to="/">CONTACT US</Link> <span>|</span>
        <Link to="/">
          <i className="fa fa-twitter" />
        </Link>
        <Link to="/">
          <i className="fa fa-facebook-square" />
        </Link>
      </div>
      <div className="copy-right">
        <p>Copyright &copy; 2017 Savepoint Inc</p>
      </div>
    </div>
  );
};

export default Footer;
