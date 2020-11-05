import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Items from "./Items";
// import { Container } from "react-bootstrap";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {/* <Typography>{children}</Typography> */}
                    {children}
                </Box>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
};

const Sections = () => {
    const [value, setValue] = useState(0);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        let vars = [];
        for (let i = 0; i < 20; i++) {
            vars.push(i + 1);
        }
        setSections(vars);
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    onChange={handleChange}
                    indicatorColor="primary"
                >
                    {sections.map((section) => (
                        <Tab
                            key={section}
                            {...a11yProps(section)}
                            label={`Section ${section}`}
                            style={{ textTransform: "none" }}
                        />
                    ))}
                </Tabs>
            </AppBar>

            {sections.map((section) => (
                <TabPanel key={section} value={value} index={section - 1}>
                    <Items section={section} />
                </TabPanel>
            ))}
        </>
    );
};

export default Sections;
