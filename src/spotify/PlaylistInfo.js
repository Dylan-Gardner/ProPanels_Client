import React from 'react'
class PlaylistInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            uri: this.props.uri
        };
    };

    render() {
        return(
            <div>
                {this.state.name}
            </div>
        );
    }
}

export default PlaylistInfo