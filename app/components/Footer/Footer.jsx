import React from "react";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import "./footer.css";
import Link from "next/link";

function Footer() {
  return (
    <footer>
      <div className="top">
        <div className="left">
          <span>Contact</span>
          <p>
            The Reading Retreat <br /> Garhwa Main Road Near Town Hall, <br />
            pin 822112
          </p>
        </div>

        <div className="mid">
          <span>Tel 123-456-7890</span>
          <br />
          <span>Email info@mysite.com</span>
          <br />
          <p>
            <Link href={"/"}>
              <FiFacebook />
            </Link>
            <Link href={"/"}>
              <FiInstagram />
            </Link>
            <Link href={"/"}>
              <FiTwitter />
            </Link>
          </p>
        </div>

        <div className="right">
          <span>Subscribe to Get Our Newsletter</span>
          <form>
            <input type="email" placeholder="Enter Your Email" />{" "}
            <button type="submit">Join</button>
          </form>
          <p>Thanks for submitting!</p>
        </div>
      </div>
      <div className="bottom">
        © 2023 by Company Name. Proudly created by Prashant Kumar Chaturvedi
      </div>
    </footer>
  );
}

export default Footer;
