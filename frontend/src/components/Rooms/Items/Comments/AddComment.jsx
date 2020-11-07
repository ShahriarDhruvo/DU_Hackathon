import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(2),
            width: "83ch",
        },
    },
}));

const AddComment = (props) => {
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(e.target.content.value);
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                size="small"
                name="content"
                label="Add Comment"
                variant="outlined"
            />
        </form>
    );
};

export default AddComment;
