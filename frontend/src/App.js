import React from "react";
import "./styles/styles.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EmailConfirmationSent from "./components/generic/EmailConfirmationSent";
import EmailConfirm from "./components/generic/EmailConfirm";
import NotFound from "./components/generic/NotFound";
import PasswordReset from "./components/generic/PasswordReset";
import Profile from "./components/Authentication/Profile";
import PasswordChange from "./components/generic/PasswordChange";
import Rooms from "./components/Rooms/Rooms";
import AuthenticationContextProvider from "./contexts/AuthenticationContext";
import SettingsContextProvider from "./contexts/SettingsContext";
import Navs from "./components/Navbar/Navbar";
import Dept from "./components/Dept/Dept";
import CreateCourse from "./components/CreateCourse/CreateCourse";
// import Notifications from "./components/Notifications/Notifications";
import MyRooms from "./components/My_Rooms/MyRooms";

import CellSimulation from "./Simulations/CellSimulation";
// import FooterPage from "./components/Footer/Footer";
// import Footer from "./components/generic/Footer";

import Footer from "./components/Footer/Footer";
import Simulations from "./Simulations/Simulations";
import BiologySimulations from "./Simulations/BiologySimulations";
import PhysicsSimulations from "./Simulations/PhysicsSimulations";
import ChemistrySimulations from "./Simulations/ChemistrySimulations";

library.add(far, fas, fab);

function App() {
    return (
        <Router>
            <SettingsContextProvider>
                <AuthenticationContextProvider>
                    <Navs />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route
                            exact
                            path="/rooms/:room_pk/"
                            component={Rooms}
                        />
                        <Route exact path="/myrooms/" component={MyRooms} />
                        <Route exact path="/homerooms/:id/" component={Dept} />
                        <Route
                            exact
                            path="/password/reset/"
                            component={PasswordReset}
                        />
                        <Route
                            exact
                            path="/password/change/"
                            component={PasswordChange}
                        />
                        <Route exact path="/profile/" component={Profile} />
                        <Route
                            exact
                            path="/email/confirmation/sent/:email/"
                            component={EmailConfirmationSent}
                        />
                        <Route
                            exact
                            path="/email/confirmation/:key/"
                            component={EmailConfirm}
                        />

                        {/* <Route
                            exact
                            path="/notifications"
                            component={Notifications}
                        /> */}

                        <Route
                            exact
                            path="/simulation"
                            component={Simulations}
                        />

                        <Route
                            exact
                            path="/simulation/biology/"
                            component={BiologySimulations}
                        />

                        <Route
                            exact
                            path="/simulation/biology/cell/simulation/"
                            component={CellSimulation}
                        />

                        <Route
                            exact
                            path="/simulation/physics/"
                            component={PhysicsSimulations}
                        />

                        <Route
                            exact
                            path="/simulation/chemistry/"
                            component={ChemistrySimulations}
                        />

                        <Route component={NotFound} />
                    </Switch>
                    <CreateCourse />
                </AuthenticationContextProvider>
            </SettingsContextProvider>
            <Footer />
        </Router>
    );
}

export default App;
