import React from 'react'
import '../spotify.css'
import ListGroup from "react-bootstrap/ListGroup";
import TrackInfo from "./TrackInfo";


class TrackView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            tracks: props.tracks,
            selectedTrack: null,
        };
    }

    onSelectTrack = (track) => {
        let showPropContainer = [...this.state.tracks];
        let tracks = showPropContainer.map((val, index) => {
            val.name === track.name ? val.style="success" : val.style="";
            return val;
        });
        this.setState({ selectedTrack: track, tracks});
        this.props.parentCallback(track);
    };

    render() {
        const song_list = this.state.tracks.map((track) =>
            <ListGroup.Item action variant={track.style} onClick={ (e) => this.onSelectTrack(track) }>
                <TrackInfo name={track.name} artists={track.artists} uri={track.uri} />
            </ListGroup.Item>);
        return(
            <ListGroup variant={"flush"} className={"user_list"}>{song_list}</ListGroup>
        )
    }
}
export default TrackView