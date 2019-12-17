import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import queryString from 'query-string'
import {spotifyLogin} from '../redux_actions/actions.js'

class SpotifyCallback extends React.Component {

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        const code = values.code;
        const state = values.state;

        this.spotifyAsync(code).then(response => {
            if(response.status == "spotify added"){
                this.props.onLogin();
                window.close();
            }
        });
    }

    async spotifyAsync(code) {

        let response = await fetch('/api/v1/spotify/auth/'+ code, {
            method: 'POST',
            headers: {
                "access-token": this.props.token,
                "token-type" : "Bearer",
                "client": this.props.client_id,
                "expiry": this.props.expiry,
                "uid": this.props.uid
            }
        });
        let data = await response.json();
        return data;
      }

    render() {
        return(
            <div>
                Made it
            </div>
        )
    }
}
SpotifyCallback.propTypes = {
    token: PropTypes.string.isRequired,
};
function mapStateToProps(state) {
    return {
      isLoggedIn: state.session.isLoggedIn,
      token: state.session.token,
      client_id: state.session.client_id,
      uid: state.session.uid,
      expiry: state.session.expiry
    };
}
  
const mapDispatchToProps = (dispatch) => {
  return {
      onLogin: () => {dispatch(spotifyLogin()) }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SpotifyCallback);