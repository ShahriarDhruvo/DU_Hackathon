import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="text-center pb-3">
            <small>Follow me on</small>

            <ul className="list-inline social">
                {/* <li className="list-inline-item clink">
                    <a href="/" className="text-syntax" target="_blank">
                        <FontAwesomeIcon icon={["fas", "globe"]} />
                    </a>
                </li> */}

                <li className="list-inline-item clink">
                    <a href="https://www.facebook.com/ShahriarDhruvo" className="text-syntax" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                    </a>
                </li>

                <li className="list-inline-item clink">
                    <a href="https://twitter.com/ShahriarDhruvo" className="text-syntax" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={["fab", "twitter"]} />
                    </a>
                </li>

                <li className="list-inline-item clink">
                    <a href="https://www.linkedin.com/in/shahriar-dhruvo-613641190/" className="text-syntax" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={["fab", "linkedin"]} />
                    </a>
                </li>

                <li className="list-inline-item clink">
                    <a href="https://github.com/ShahriarDhruvo" className="text-syntax" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={["fab", "github"]} />
                    </a>
                </li>
            </ul>

            <Link to="/me" className="text-syntax">
                <small>Who & What made this possible?</small>
            </Link>
        </footer>
    );
};

export default Footer;
