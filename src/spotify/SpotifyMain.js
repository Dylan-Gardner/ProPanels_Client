import React from 'react'
import '../spotify.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import SpotifyPlayer from "react-spotify-web-playback";
import TrackView from "./TrackView";
import PlaylistView from "./PlaylistView"
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class SpotifyMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            tracks: [],
            spotify_token: null,
            selectedTrack: null,
            selectedPlaylist: null
        };
    }

    componentDidMount() {
        this.getUserInfo();
        setInterval(async () => { await this.updateToken() }, 60000);
    }

    updateToken() {
        let that = this;
        this.getUserToken().then(function(response) {
             that.setState({
                 spotify_token: response
             })
        } );
    }

    async getUserInfo(){
        const token = await this.getUserToken();
        const tracks = await this.getUserSongs();
        const playlists = await this.getUserPlaylists();
        this.setState({
            spotify_token: token,
            tracks: tracks,
            playlists: playlists
        });
    }


    async getUserToken(){
        const response = await fetch('/api/v1/spotify/get_token', {
            method: 'GET',
            accept: 'application/json',
            headers: {
                "access-token": this.props.token,
                "token-type" : "Bearer",
                "client": this.props.client_id,
                "expiry": this.props.expiry,
                "uid": this.props.uid
            }
        });
        let data = await response.json();
        return data.token;
    }

    async getUserSongs(){
        const response = await fetch('/api/v1/spotify/user_saved_songs', {
            method: 'GET',
            headers: {
                "access-token": this.props.token,
                "token-type" : "Bearer",
                "client": this.props.client_id,
                "expiry": this.props.expiry,
                "uid": this.props.uid
            }
        });
        let data = await response.json();
        console.log(data);
        return data.tracks;
    }

    async getUserPlaylists() {
        const response = await await fetch('/api/v1/spotify/user_playlists', {
            method: 'GET',
            headers: {
                "access-token": this.props.token,
                "token-type" : "Bearer",
                "client": this.props.client_id,
                "expiry": this.props.expiry,
                "uid": this.props.uid
            }
        });
        let data = await response.json();
        return data.playlists;
    }


    playerCallback(state){
        console.log(state);
    }

    songSelectCallback = (childData) => {
        console.log(childData);
        this.setState({selectedTrack: childData})
    };

    playlistSelectCallback = (childData) => {
        this.setState({selectedPlaylist: childData})
    };

    render() {
        console.log(this.state);
        let uri = null;
        if(this.state.selectedTrack != null){
            uri = [this.state.selectedTrack.uri];
        }
        return(<Container fluid={true}>
            <Row>
                <Col>
                    {this.state.tracks.length > 0 &&
                    <TrackView parentCallback={this.songSelectCallback} tracks={this.state.tracks}/>
                    }
                </Col>
                <Col>
                    {this.state.playlists.length > 0 &&
                    <PlaylistView parentCallback={this.playlistSelectCallback} playlists={this.state.playlists}/>}
                </Col>
            </Row>
            <Navbar fixed={"bottom"}>
                {this.state.spotify_token != null &&
                <SpotifyPlayer
                    autoPlay={true}
                    play={true}
                    token={this.state.spotify_token}
                    showSaveIcon={true}
                    persistDeviceSelection={true}
                    syncExternalDeviceInterval={2}
                    callback={this.playerCallback}
                    uris={uri}/>
                }
            </Navbar>
        </Container>)
    }
}

SpotifyMain.propTypes = {
    token: PropTypes.string.isRequired,
  };
function mapStateToProps(state) {
    return {
        token: state.session.token,
        client_id: state.session.client_id,
        uid: state.session.uid,
        expiry: state.session.expiry,
    };
}
export default connect(mapStateToProps)(SpotifyMain);
