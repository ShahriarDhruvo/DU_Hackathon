import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comments = (props) => {
    const [comments, setComments] = useState([]);
    const [vote, setVote] = useState(0);

    useEffect(() => {
        let vars = [];
        for (let i = 0; i < 3; i++) {
            vars.push(i + 1);
        }
        setComments(vars);
    }, []);

    const upVote = () => setVote(vote + 1);
    const downVote = () => setVote(vote - 1);

    return (
        <div className="mx-3">
            {comments.map((comment) => (
                <div key={comment} className="d-flex mb-3">
                    <div
                        className="mr-2 mt-1 text-center"
                        style={{ wordBreak: "normal" }}
                    >
                        <button onClick={upVote} className="btn__none">
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "chevron-up"]}
                            />
                        </button>

                        {vote}

                        <button onClick={downVote} className="btn__none">
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "chevron-down"]}
                            />
                        </button>
                    </div>

                    <div>
                        <div className="text-left border-bottom">
                            <small>28 August, 2020, 8:31PM</small>
                            <br />
                            <small>
                                BlaBlaBlABlABlaShahriarElahiDhruvo_2017831060
                            </small>
                        </div>

                        <div className="mt-2">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Dignissimos dolorem quae pariatur! Aperiam
                            possimus commodi sint officia modi. Fugiat hic culpa
                            optio repudiandae? Quos itaque, magni exercitationem
                            molestias pariatur quaerat.``
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;
