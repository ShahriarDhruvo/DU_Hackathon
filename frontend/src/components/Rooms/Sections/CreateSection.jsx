import React from "react";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AntTab = withStyles(() => ({
    root: {
        minWidth: 50,
    },
}))((props) => <Tab disableRipple {...props} />);

const CreateSection = (props) => {
    const handleAddSection = () => {
        console.log("maramari");
    };

    return (
        <AntTab
            label={
                <FontAwesomeIcon className="fa-icon" icon={["fas", "plus"]} />
            }
            onClick={handleAddSection}
        />
    );
};

export default CreateSection;
