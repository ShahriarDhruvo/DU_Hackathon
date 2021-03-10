import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <footer className="footer navbar-static-bottom main-footer text-center rounded-top pb-3">
            <small>Follow us on</small>

            <ul className="list-inline social">
                <li className="list-inline-item clink">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                    </a>
                </li>

                <li className="list-inline-item clink">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FontAwesomeIcon icon={["fab", "twitter"]} />
                    </a>
                </li>

                <li className="list-inline-item clink">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FontAwesomeIcon icon={["fab", "stack-overflow"]} />
                    </a>
                </li>

                <li className="list-inline-item clink">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FontAwesomeIcon icon={["fab", "linkedin"]} />
                    </a>
                </li>

                <li className="list-inline-item clink">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FontAwesomeIcon icon={["fab", "github"]} />
                    </a>
                </li>

                <div>
                    <Link
                        to="/legends"
                        style={{ fontSize: "0.9rem", color: "white" }}
                    >
                        Who are the Legends?
                    </Link>
                </div>
            </ul>

            <small>
                &copy;{new Date().getFullYear()} ClassPortal, Inc | All rights
                reserved
            </small>
        </footer>
    );
};

export default Footer;
