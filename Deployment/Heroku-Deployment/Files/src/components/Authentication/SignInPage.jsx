import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { SettingsContext } from "../../contexts/SettingsContext";
import SignIn from "./SignIn";

const SignInPage = () => {
    const [signInShow, setSignInShow] = useState(true);
    const { isAnimated } = useContext(SettingsContext);

    return (
        <Container>
            <SignIn
                show={signInShow}
                animation={isAnimated}
                onHide={() => setSignInShow(false)}
            />
        </Container>
    );
};

export default SignInPage;
