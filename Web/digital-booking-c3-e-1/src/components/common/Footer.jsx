import { AiOutlineCopyright } from "react-icons/ai";
import { FiGitlab, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContainer">
        <div className="isologotipo">
          <img
            className="logo"
            src="https://c3-e1-digital-booking.s3.us-east-2.amazonaws.com/img/isologotipo.svg"
            alt="isologotipo de Digital Booking"
          />
<<<<<<< HEAD
          <p>Sin equipo no hay aventura</p>
          <div className="copyright">
            <AiOutlineCopyright />{" "}
            <p>
              2023<span>|</span> Copyright
            </p>
          </div>
=======
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
>>>>>>> c745d2fd0d4da77d38337c252e93018b79633e50
        </div>

        <div className="footerIcons">
          <a
            href="https://gitlab.ctd.academy/ctd/hispanos/proyecto-integrador-1/proyecto-integrador-0523/1021pt-c3/equipo-01"
            className="icon-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGitlab className="icon" />
          </a>
          <a href="#" className="icon-link">
            {" "}
            <FiInstagram className="icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
