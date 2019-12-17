import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home'
import UserProfile from './UserProfile'
import { Router, Switch, Route} from 'react-router-dom'
import Login from './session/Login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import history from './history'
import Signup from './session/Signup';
import SpotifyCallback from './spotify/SpotifyCallback'
import OutlookCallback from './outlook/OutlookCalback'


class App extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component = {Home} />
                    <Route exact path='/login' component = {Login} />
                    <Route exact path='/sign_up' component = {Signup} />
                    <Route exact path="/user_profile" component={UserProfile} />
                    <Route path='/spotify/callback' component={SpotifyCallback} />
                    <Route path='/outlook/callback' component={OutlookCallback} />
                </Switch>
            </Router>
        )
    }
}

App.propTypes = {
  token: PropTypes.string.isRequired,
};
function mapStateToProps(state) {
  return {
    isLoggedIn: state.session.isLoggedIn,
    token: state.session.token
  };
}

export default connect(mapStateToProps)(App);
