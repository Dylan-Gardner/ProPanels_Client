import React from 'react'
class TrackInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            artists: this.props.artists,
            uri: this.props.uri
        };
    }

    render() {
        const artists_string = this.state.artists.join(", ");
        return(
        <div>
            <div>{this.state.name} - {artists_string}</div>
        </div>);
    }
}

export default TrackInfo