import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container inner">
        <div className="row  justify-content-center">
          <div className="col-auto">
            <Link to={`/`}>
              <FontAwesomeIcon
                style={{ fontSize: "40px", color: "#FFFCF7" }}
                icon={["fab", "github"]}
              />
            </Link>
          </div>
          <div className="col-auto">
            <Link to={`/`}>
            <FontAwesomeIcon
                style={{ fontSize: "40px", color: "#FFFCF7" }}
                icon={["fab", "linkedin"]}
              />
            </Link>
          </div>
          <div className="col-auto">
            <Link to={`/`}>
            <FontAwesomeIcon
                style={{ fontSize: "40px", color: "#FFFCF7" }}
                icon={["fab", "stack-overflow"]}
              />
            </Link>
          </div>
          <div className="col-auto">
            <Link to={`/`}>
            <FontAwesomeIcon
                style={{ fontSize: "40px", color: "#FFFCF7" }}
                icon={["fab", "facebook-square"]}
              />
            </Link>
          </div>
          <div className="col-auto">
            <Link to={`/`}>
            <FontAwesomeIcon
                style={{ fontSize: "40px", color: "#FFFCF7" }}
                icon={["fab", "twitter"]}
              />
            </Link>
          </div>
        </div>
        <hr style={{backgroundColor:"#FFFCF7"}} />
        <div className="row justify-content-center">
          <div>
            <p>
              Copyright &copy;{new Date().getFullYear()} | All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;