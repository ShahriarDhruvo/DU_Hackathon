import React, { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import CustomAlert from "../../../../generic/CustomAlert";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            width: "100%",
        },
    },
}));

const AddComment = (props) => {
    const form = useRef(null);
    const classes = useStyles();
    const [status, setStatus] = useState(undefined);

    const handleSubmit = (e) => {
        e.preventDefault();

        const API_URL = `/api/v1/rooms/sections/items/comments/${props.room_pk}/${props.item_pk}/create/`;

        const loadData = async () => {
            const formData = new FormData(form.current);

            let response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            let data = await response.json();

            if (!response.ok) setStatus(data.detail);
        };

        loadData();
        props.updateFlag();
        document.getElementById("add-comment-form").reset();
    };

    return (
        <form
            ref={form}
            id="add-comment-form"
            onSubmit={handleSubmit}
            className={classes.root + " my-3"}
        >
            {status && <CustomAlert variant="warning" status={status} />}

            <TextField
                size="small"
                name="content"
                variant="outlined"
                label="Add Comment"
            />
        </form>
    );
};

export default AddComment;
