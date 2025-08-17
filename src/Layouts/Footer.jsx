import React from "react";
import Logo from "./Logo";
// import Logo from "../Logo/Logo";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" mt-24 footer footer-horizontal footer-center bg-[#EFEFEF] text-primary-content p-10">
      <aside>
        <div className=" mb-10">
          <Logo></Logo>
        </div>

        <p className="text-gray-600">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://www.linkedin.com/in/md-iftekhar7"
            target="_blank"
            className="text-gray-800"
          >
            <FaLinkedin size={40} />
          </a>
          <a
            href="https://github.com/Iftekhar-007"
            target="_blank"
            className="text-gray-800"
          >
            <FaGithub size={40} />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
