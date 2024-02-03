import "./Footer.css";
import { Container, useTheme } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
// @ts-ignore
import logoImgLight from "../../assets/logo2.svg";
// @ts-ignore
import logoImgDark from "../../assets/logo1.svg";

const Footer = () => {
  const theme = useTheme();
  return (
    <footer
      style={{
        backgroundColor: "#2b3445",
      }}
    >
      <div className="container row">
        <div className="footer-col">
          <div className="flex-col">
            <div className="logo">
              <img src={logoImgLight} alt="" />
            </div>
          </div>
          <div className="social-links">
            <a>
              <Facebook />
            </a>
            <a>
              <Twitter />
            </a>
            <a>
              <LinkedIn />
            </a>
            <a>
              <Instagram />
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>company</h4>
          <ul>
            <li>
              <a>about us</a>
            </li>
            <li>
              <a>our services</a>
            </li>
            <li>
              <a>privacy policy</a>
            </li>
            <li>
              <a>visit website</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>get help</h4>
          <ul>
            <li>
              <a>FAQ</a>
            </li>
            <li>
              <a>shipping</a>
            </li>
            <li>
              <a>returns</a>
            </li>
            <li>
              <a>order status</a>
            </li>
            <li>
              <a>payment options</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>online shop</h4>
          <ul>
            <li>
              <a>download</a>
            </li>
            <li>
              <a>changelog</a>
            </li>
            <li>
              <a>github</a>
            </li>
            <li>
              <a>all version</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
