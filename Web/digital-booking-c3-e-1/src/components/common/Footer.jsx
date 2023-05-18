import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContainer">
        <div className="isologotipo">
          <img
            className="logo"
            src="/isologotipo.svg"
            alt="isologotipo de Digital Booking"
          />
          <img
            className="lema"
            src="/lema.png"
            alt="lema de Digital Booking"
          />
          <img
            className="copyright"
            src="/copyright.png"
            alt="imagen copyright"
          />
        </div>
        <div className="footerIcons">
          <img src="/icon facebook.png" alt="icono Facebook" />
          <img src="/Vector.png" alt="icono Linkedin" />
          <img src="/tweet.png" alt="icono Tweeter" />
          <img src="/insta.png" alt="icono Instagram" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
