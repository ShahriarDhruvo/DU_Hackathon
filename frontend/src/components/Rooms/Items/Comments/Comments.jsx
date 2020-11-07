import React, { useEffect, useState } from "react";
import Counter from "../../../generic/Counter";
import AddComment from "./AddComment";

const Comments = (props) => {
    const [show, setShow] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let vars = [];
        for (let i = 0; i < 3; i++) {
            vars.push(i + 1);
        }
        setComments(vars);
    }, []);

    const handleShow = () => setShow(!show);

    return (
        <div>
            <button
                onClick={handleShow}
                className="text-left p-3 btn-link btn__none"
            >
                {!show ? "Show" : "Hide"} comments
            </button>

            <div className="mx-3">
                {show && (
                    <>
                        {comments.map((comment) => (
                            <div key={comment} className="d-flex mb-3">
                                <Counter />

                                <div>
                                    <div className="text-left border-bottom">
                                        <small>28 August, 2020, 8:31PM</small>
                                        <br />
                                        <small>
                                            BlaBlaBlABlABlaShahriarElahiDhruvo_2017831060
                                        </small>
                                    </div>

                                    <div className="mt-2">
                                        Lorem ipsum dolor, sit amet consectetur
                                        adipisicing elit. Dignissimos dolorem
                                        quae pariatur! Aperiam possimus commodi
                                        sint officia modi. Fugiat hic culpa
                                        optio repudiandae? Quos itaque, magni
                                        exercitationem molestias pariatur
                                        quaerat.``
                                    </div>
                                </div>
                            </div>
                        ))}

                        <AddComment />
                    </>
                )}
            </div>
        </div>
    );
};

export default Comments;
