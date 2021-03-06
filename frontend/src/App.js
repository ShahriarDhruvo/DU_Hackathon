import React from "react";
import "./styles/styles.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Home from "./components/Home/Home";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
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

import Simulation from "./Simulations/Simulation";
// import FooterPage from "./components/Footer/Footer";
// import Footer from "./components/generic/Footer";

import Footer from "./components/Footer/Footer";
import SimulationSubjects from "./Simulations/SimulationSubjects";
import BiologySimulations from "./Simulations/BiologySimulations";
import PhysicsSimulations from "./Simulations/PhysicsSimulations";
import ChemistrySimulations from "./Simulations/ChemistrySimulations";
import SignInPage from "./components/Authentication/SignInPage";
import PassworResetConfirm from "./components/generic/PasswordResetConfirm";
import Us from "./components/legends/Us";

library.add(far, fas, fab);

const App = () => {
    return (
        <Router basename="/static">
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
                            path="/password/reset/confirm/:uid/:token/"
                            component={PassworResetConfirm}
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
                        <Route exact path="/login/" component={SignInPage} />

                        {/* <Route
                            exact
                            path="/notifications"
                            component={Notifications}
                        /> */}

                        <Route
                            exact
                            path="/simulation"
                            component={SimulationSubjects}
                        />

                        <Route
                            exact
                            path="/simulation/biology/"
                            component={BiologySimulations}
                        />

                        <Route
                            exact
                            path="/simulation/biology/cell/simulation/"
                            component={Simulation}
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

                        <Route exact path="/legends/" component={Us} />

                        <Route component={NotFound} />
                    </Switch>
                    <CreateCourse />
                </AuthenticationContextProvider>
            </SettingsContextProvider>
            <Footer />
        </Router>
    );
};

export default App;
