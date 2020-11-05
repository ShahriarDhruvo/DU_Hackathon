import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Comments from "./Comments";

const Items = (props) => {
    const [items, setItems] = useState([]);
    const [show, setShow] = useState(true);

    useEffect(() => {
        let vars = [];
        for (let i = 0; i < 20; i++) {
            vars.push(i + 1);
        }
        setItems(vars);
    }, []);

    const handleShow = () => setShow(!show);

    return (
        <>
            {items.map((section) => (
                <Card
                    key={section}
                    style={{ maxWidth: "60rem" }}
                    className="mx-auto mb-3"
                >
                    <Card.Header className="d-md-flex justify-content-between">
                        <div>2 days</div>
                        <div>BlaBlaBlABlABlaShahriarElahiDhruvo_2017831060</div>
                    </Card.Header>
                    <Card.Body className="border-bottom">
                        <Card.Title>
                            {props.section} Special title treatment
                        </Card.Title>
                        <Card.Text>
                            The dept of CSE, SUST is happy to offer you to enrol
                            the CCNA course (full CCNA1, CCNA2 and CCNA3) with a
                            minimal registration fees of 6000 tk (for male
                            students) and 5000 tk (for female students). Note
                            that Cisco always gives a discounted rate to female
                            students to motivate them in Computing fields.
                        </Card.Text>
                    </Card.Body>

                    <button
                        onClick={handleShow}
                        className="text-left p-3 btn-link btn__none"
                    >
                        {!show ? "Show" : "Hide"} comments
                    </button>

                    {show && <Comments />}
                </Card>
            ))}
        </>
    );
};

export default Items;
