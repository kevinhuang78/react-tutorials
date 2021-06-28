import 'moongano-front-library/dist/css/style.css';
import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/Credentials/LoginScreen";
import NotFoundExceptionScreen from "./screens/Exceptions/NotFoundExceptionScreen";
import SignUpScreen from "./screens/Credentials/SignUpScreen";
import SignUpConfirmationScreen from "./screens/Credentials/SignUpConfirmationScreen";
import ValidateUsersScreen from "./screens/Credentials/ValidateUsersScreen";
import ProfileScreen from "./screens/Profile/ProfilePageScreen";
import ProfileEditScreen from "./screens/Profile/ProfileHeaderEditScreen";
import AuthRoute from "./utils/AuthRoute";
import NewBlobScreen from "./screens/Blob/NewBlobScreen";
import ResourcePageScreen from "./screens/Blob/ResourcePageScreen";
import ThemePageScreen from "./screens/Blob/ThemePageScreen";
import ExternalLinkScreen from "./screens/Blob/ExternalLinkScreen";
import CommunicationDataFormScreen from "./screens/Sections/CommunicationDataFormScreen";
import PageDescriptionFormScreen from "./screens/Sections/PageDescriptionFormScreen";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomeScreen} />
                    <Route exact path="/log-in" component={LoginScreen} />
                    <Route exact path="/sign-up" component={SignUpScreen} />
                    <Route exact path="/:id/sign-up-confirmation" component={SignUpConfirmationScreen} />
                    <Route exact path="/validate-users/:token" component={ValidateUsersScreen} />
                    <Route exact path="/blob/profile/:profilePageId" component={ProfileScreen} />
                    <Route exact path="/blob/resource/:resourcePageId" component={ResourcePageScreen} />
                    <Route exact path="/blob/theme/:themePageId" component={ThemePageScreen} />
                    <Route exact path="/blob/external-link/:externalLinkPageId" component={ExternalLinkScreen} />
                    <AuthRoute exact path="/blob/:pageId/new" component={NewBlobScreen} />
                    <AuthRoute exact path="/profile/:profilePageId/edit" component={ProfileEditScreen} />
                    <AuthRoute exact path="/communication/:communicationDataId/edit" component={CommunicationDataFormScreen} />
                    <AuthRoute exact path="/blob/:pageId/communication/new" component={CommunicationDataFormScreen} />
                    <AuthRoute exact path="/page-description/:pageDescriptionId/edit" component={PageDescriptionFormScreen} />
                    <AuthRoute exact path="/blob/:pageId/page-description/new" component={PageDescriptionFormScreen} />

                    {/* Last Route is 404 Not Found, if it doesn't find any of these route, show 404 */}
                    <Route component={NotFoundExceptionScreen} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;