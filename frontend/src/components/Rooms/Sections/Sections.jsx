import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Items from "../Items/Items";
import CustomAlert from "../../generic/CustomAlert";
import CreateItemModal from "../Items/CreateItemModal";
import { Row } from "react-bootstrap";
import CreateSectionModal from "./CreateSectionModal";
import DeleteSectionModal from "./DeleteSectionModal";

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
            {value === index && <Box p={3}>{children}</Box>}
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

const Sections = (props) => {
    const [value, setValue] = useState(0);
    const [sections, setSections] = useState([]);
    const [status, setStatus] = useState(undefined);

    useEffect(() => {
        const API_URL = `/api/v1/rooms/sections/${props.room_pk}/list/`;

        const loadData = async () => {
            let response = await fetch(API_URL, {
                method: "GET",
            });

            let data = await response.json();

            if (!response.ok) setStatus(data.detail);
            else setSections(data);
        };

        loadData();
    }, [props.room_pk]);

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
                            key={section.id}
                            label={section.title}
                            {...a11yProps(section.id)}
                            style={{ textTransform: "none" }}
                        />
                    ))}

                    <CreateSectionModal room_pk={props.room_pk} />
                </Tabs>
            </AppBar>

            {status && <CustomAlert variant="warning" status={status} />}

            {sections.map((section, index) => (
                <TabPanel key={section.id} value={value} index={index}>
                    <Items room_pk={props.room_pk} section_pk={section.id} />

                    <Row className="d-flex justify-content-around">
                        <CreateItemModal
                            actionButtonSize="sm"
                            actionButtonClass="btn-link btn__none"
                        >
                            Create an Item
                        </CreateItemModal>

                        <DeleteSectionModal
                            modalTitle="Delete"
                            actionButtonSize="sm"
                            actionVariant="danger"
                            room_pk={props.room_pk}
                            section_pk={section.id}
                            actionButtonClass="btn__none"
                            modalBody={`Do you really want to delete "${section.title}" section?`}
                        >
                            Delete this Section
                        </DeleteSectionModal>
                    </Row>
                </TabPanel>
            ))}
        </>
    );
};

export default Sections;
