import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {Route, withRouter} from 'react-router-dom'
                   
const EmailConfirmationSent = () => {
    const params = useParams();

    return (
        <Container className="vertical-center">
            <div
                className="ccard p-3 p-sm-4 bg-main-bg text-center"
                style={{ maxWidth: "28rem" }}
            >
                <h5>Verify Your E-mail Address</h5>

                <p className="my-3">
                    We have sent an e-mail to you for verification. Follow the
                    link provided to finalize the signup process. Please contact
                    us if you do not receive it within a few minutes.
                </p>

                
            </div>
        </Container>
    );
};

export default withRouter(EmailConfirmationSent);

