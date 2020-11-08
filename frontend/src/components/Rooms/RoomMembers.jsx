import React, { useState, useEffect } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";

const RoomMembers = (props) => {
    const [value, setValue] = useState(0);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        let vars = [];
        for (let i = 0; i < 30; i++) {
            vars.push(i + 1);
        }
        setMembers(vars);
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
                    variant="fullWidth"
                    onChange={handleChange}
                    indicatorColor="primary"
                >
                    <Tab
                        label="Room's Members"
                        style={{ textTransform: "none" }}
                    />
                </Tabs>
            </AppBar>

            <div className="px-3 py-4">
                {members.map((member) => (
                    <div key={member}>
                        <div className="mb-2">
                            <p className="mb-0">
                                ShahriarElahiDhruvo_2017831060
                            </p>
                            <footer className="blockquote-footer">
                                Student
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default RoomMembers;
