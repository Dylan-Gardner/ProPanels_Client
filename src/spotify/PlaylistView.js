import React from 'react'
import '../spotify.css'
import ListGroup from "react-bootstrap/ListGroup";
import PlaylistInfo from "./PlaylistInfo";

class PlaylistView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            playlists: props.playlists,
            selectedPlaylist: null
        }
    }

    onSelectPlaylist = (playlist) => {
        let showPropContainer = [...this.state.playlists];
        let playlists = showPropContainer.map((val, index) => {
            val.name === playlist.name ? val.style="success" : val.style="";
            return val;
        });
        this.setState({ selectedPlaylist: playlist, playlists});
        this.props.parentCallback(playlist);
    };

    render() {
        const playlist_list = this.state.playlists.map((playlist) =>
            <ListGroup.Item action variant={playlist.style} onClick={(e) => this.onSelectPlaylist(playlist)}>
                <PlaylistInfo name={playlist.name} uri={playlist.uri}/>
            </ListGroup.Item>);
        return(
            <ListGroup variant={"flush"} className={"user_list"}>{playlist_list}</ListGroup>
        )
    }
}

export default PlaylistView