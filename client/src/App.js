import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux'
import { IntlProvider } from "react-intl"
import Loader from 'react-loader'
import PropTypes from 'prop-types'
import HomePage from './components/pages/HomePage';
import SignupPage from './components/pages/SignupPage'
import LoginPage from './components/pages/LoginPage'
import DashboardPage from './components/pages/DashboardPage'
import ConfirmationPage from './components/pages/ConfirmationPage'
import ForgotPasswordPage from './components/pages/ForgotPasswordPage'
import ResetPasswordPage from './components/pages/ResetPasswordPage'
import TopicPage from './components/pages/TopicPage'
import AddQuestionPage from './components/pages/AddQuestionPage'
import GuestRoute from './components/routes/GuestRoute'
import UserRoute from './components/routes/UserRoute'
import {fetchCurrentUser} from './actions/users'
import messages from "./messages"

class App extends React.Component {
    componentDidMount() {
        if(this.props.isAuthenticated ) this.props.fetchCurrentUser();
    }

    render() {
        const { location, isAuthenticated, loaded, lang } = this.props;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div>
                    <Loader loaded={loaded}>
                        {/*{ isAuthenticated && <Redirect to="/dashboard" />}*/}
                        <Route location={location} path="/" exact component={HomePage}/>
                        <Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
                        <GuestRoute location={location} path="/signup" exact component={SignupPage} />
                        <GuestRoute location={location} path="/login" exact component={LoginPage} />
                        <GuestRoute location={location} path="/forgot_password" exact component={ForgotPasswordPage} />
                        <GuestRoute location={location} path="/reset_password/:token" exact component={ResetPasswordPage} />
                        <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
                        <UserRoute location={location} path="/topic/:id" exact component={TopicPage} />
                        <UserRoute location={location} path="/addquestion" exact component={AddQuestionPage} />
                    </Loader>
                </div>
            </IntlProvider>
        );
    }
}

App.PropTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return{
        isAuthenticated: !!state.user.email,
        loaded: state.user.loaded,
        lang: state.locale.lang
    };
}

export default connect(mapStateToProps, {fetchCurrentUser})(App);
