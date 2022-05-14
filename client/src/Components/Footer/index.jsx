import React from 'react';
import {
  Instagram, Phone, Twitter, FacebookOutlined, WhatsApp,
} from '@mui/icons-material';
import './Footer.css';

function Footer() {
  return (
    <>
      <hr />
      <div className="main-footer">
        <div className="footer-left">
          <p className="text-left">
            Copyright 2022
            {' '}
            <span className="instamart">instamart</span>
            .com
          </p>
          <p className="text-left">
            All rights reserved.
          </p>
        </div>
        <div className="footer-mid">
          <Phone color="disabled" />
          <p>1900 - 6666</p>
        </div>
        <div className="footer-right">
          <Twitter sx={{ color: '#3AB77D' }} />
          <Instagram sx={{ color: '#3AB77D' }} />
          <WhatsApp sx={{ color: '#3AB77D' }} />
          <FacebookOutlined sx={{ color: '#3AB77D' }} />
        </div>
      </div>
    </>
  );
}
export default Footer;
