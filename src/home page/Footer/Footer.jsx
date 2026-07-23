import React from "react";
import craveryLogo from "../../assets/logo/the-cravery-logo.png";
import { MdOutlineMail } from "react-icons/md";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-(--bg-dark-green) text-white py-4 px-8 flex flex-col justify-between items-center w-full"
    >
      {/* upper Part */}
      <div className="flex items-center justify-between w-full gap-8 max-w-7xl mx-auto border-b border-(--bg-gold) py-10">
        <div className="flex items-center gap-3">
          <img
            src={craveryLogo}
            alt="The Cravery Logo"
            className="h-14 w-auto object-contain"
          />

          <div>
            <h1 className="font-cursive text-3xl text-(--text-gold)">
              The Cravory
            </h1>
            <p className="text-xs tracking-[2px] uppercase">Premium Gifting</p>
          </div>
        </div>

        <div className="flex flex-col ">
          <a href="" className="hover:text-(--text-gold) transition">
            1-ff E-block, Rishi Nagar Ludhiana, Punjab 141001
          </a>
          <a
            href="tel:+917658856874"
            className="hover:text-(--text-gold) transition"
          >
            +91 76588 56874
          </a>
          <a
            href="mailto:info@thecravery.com"
            className="hover:text-(--text-gold) transition flex items-center gap-2"
          >
            <MdOutlineMail /> info@thecravery.com
          </a>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Social Links</h3>
          <div className="flex gap-4 items-center justify-center">
            <a
              href="https://www.instagram.com/thecravery/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--text-gold) transition"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.facebook.com/thecravery/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--text-gold) transition"
            >
              <FaFacebook size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* lower footer section */}
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto py-6 flex-col md:flex-row gap-2">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-(--text-light-green)">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-(--text-light-green)">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
