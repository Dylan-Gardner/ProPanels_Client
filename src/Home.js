import React from 'react'
import {Redirect} from 'react-router-dom'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SpotifyMain from "./spotify/SpotifyMain";
import Header from "./Header";
import OutlookMain from "./outlook/OutlookMain";
import { connect } from 'react-redux';
import {spotifyLogin, outlookLogin} from './redux_actions/actions.js'
import PropTypes from 'prop-types'


class Home extends React.Component {

    componentDidMount(){
        if(this.props.isLoggedIn){
            fetch('/api/v1/spotify/status', {
                method: 'GET',
                headers: {
                    "access-token": this.props.token,
                    "token-type" : "Bearer",
                    "client": this.props.client_id,
                    "expiry": this.props.expiry,
                    "uid": this.props.uid
                }
            }).then(response => response.json())
            .then(json => {
                if(!json.status){
                    console.log('Error');
                }else{
                    this.props.onSpotifyStatus();
                    console.log(json.status);
                }
            });

            fetch('/api/v1/outlook/status', {
                method: 'GET',
                headers: {
                    "access-token": this.props.token,
                    "token-type" : "Bearer",
                    "client": this.props.client_id,
                    "expiry": this.props.expiry,
                    "uid": this.props.uid
                }
            }).then(response => response.json())
            .then(json => {
                if(!json.status){
                    console.log('Error');
                }else{
                    this.props.onOutlookLogin();
                    console.log(json.status);
                }
            })
        }
    }





    renderRedirect = () => {
      if(!this.props.isLoggedIn) {
        return <Redirect to= '/login'/>
      }
    }

    spotifyAuth = () => {
        var redirect = "";
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            redirect = "http%3A%2F%2Flocalhost%3A3000%2Fspotify%2Fcallback&"
        } else {
            redirect = "https%3A%2F%2Fproductivity-panel.herokuapp.com%2Fspotify%2Fcallback&";
        }
        window.open('https://accounts.spotify.com/authorize?'+
        'client_id=8bb06eeaea5b411a88e14160aeffd3be&'+
        'redirect_uri='+redirect+
        'response_type=code'+
        '&scope=playlist-read-private%20user-read-private%20user-read-email%20user-library-read%20user-library-modify%20streaming%20user-read-playback-state%20user-modify-playback-state&'+
        'state=testtesttest');
    }

    outlookAuth = () => {
        var redirect = "";
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            redirect = "http%3A%2F%2Flocalhost%3A3000%2Foutlook%2Fcallback"
        } else {
            redirect = "https%3A%2F%2Fproductivity-panel.herokuapp.com%2Foutlook%2Fcallback";
        }
        window.open('https://login.microsoftonline.com/common'+
        '/oauth2/v2.0/authorize?'+
        'client_id=bc033e51-a90c-4053-a2a7-91297422f2ad'+
        '&response_type=code'+
        '&redirect_uri='+redirect+
        '&response_mode=query'+
        '&scope=offline_access%20user.read%20mail.read%20contacts.read%20calendars.read%20email%20openid%20profile'+
        '&state=12345')
    }

    renderSpotify = () => {
      if(this.props.spotifyStatus){
        return <SpotifyMain/>
      }else{
        return <button className='btn btn-primary' onClick={this.spotifyAuth}>Spotify Sign In</button>
      }
    }

    renderCalendar = () => {
        if(this.props.outlookStatus){
            return <OutlookMain />
        }else{
            return<button className='btn btn-primary' onClick={this.outlookAuth}>Outlook Sign In</button>
        }
    }

    render() {

        return (
            <Container fluid={true}>
                {this.renderRedirect()}
                <Header />
                <Row>
                    <Col>
                        {this.renderCalendar()}
                    </Col>
                    <Col>
                        {this.renderSpotify()}
                    </Col>
                </Row>
            </Container>
        )
    }
}

Home.propTypes = {
  token: PropTypes.string.isRequired,
};
function mapStateToProps(state) {
  return {
    isLoggedIn: state.session.isLoggedIn,
    token: state.session.token,
    client_id: state.session.client_id,
    uid: state.session.uid,
    expiry: state.session.expiry,
    spotifyStatus: state.session.spotifyStatus,
    outlookStatus: state.session.outlookStatus
  };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSpotifyStatus: () => { dispatch(spotifyLogin()) },
        onOutlookLogin: () => { dispatch(outlookLogin()) }
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Home);
