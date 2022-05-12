import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
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
          <PhoneIcon color="disabled" />
          <p>1900 - 6666</p>
        </div>
        <div className="footer-right">
          <TwitterIcon sx={{ color: '#3AB77D' }} />
          <InstagramIcon sx={{ color: '#3AB77D' }} />
          <WhatsAppIcon sx={{ color: '#3AB77D' }} />
          <FacebookOutlinedIcon sx={{ color: '#3AB77D' }} />
        </div>
      </div>
    </>
  );
}
export default Footer;
