import React from "react";
import emoji from "react-easy-emoji";

const Header = (props) => {
    return (
        <div className="clogo mb-5 text-center">
            <div style={{ fontSize: "1.72rem" }}>
                {props.title ? props.title : "ToDo++"}
            </div>

            {props.subTitle ? (
                <span style={{ fontSize: "0.86rem" }}>{props.subTitle}</span>
            ) : (
                <span style={{ fontSize: "0.86rem" }}>
                    More than some To Do List {emoji("🤪")}
                </span>
            )}
        </div>
    );
};

export default Header;
