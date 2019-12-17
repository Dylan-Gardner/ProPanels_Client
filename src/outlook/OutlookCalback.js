import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import queryString from 'query-string'
import {outlookLogin} from '../redux_actions/actions.js'

class OutlookCallback extends React.Component {

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        const code = values.code;
        const state = values.state;

        this.outlookAsync(code,state).then(response => {
            if(response.status == "outlook added"){
                this.props.onLogin();
                window.close();
            }
        });
    }

    async outlookAsync(code) {

        let response = await fetch('/api/v1/outlook/auth/'+ code, {
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
OutlookCallback.propTypes = {
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
      onLogin: () => {dispatch(outlookLogin()) }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(OutlookCallback);