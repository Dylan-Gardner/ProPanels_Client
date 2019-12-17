import React from 'react'
import axios from 'axios'
class UserProfile extends React.Component {

    state = {
        email: null,
        username: null,
        spotify_user_hash: null
    };

    componentDidMount() {
        let that = this;
        axios.get('/api/v1/spotify/user_info',{})
            .then(function (response) {
                that.setState({
                    email: response.data['email'],
                    username: response.data['username'],
                    spotify_user_hash: response.data['spotify_user_hash']
                })
            }).catch(function(error) {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <p>Username: {this.state.username}</p>
                <p>Email: {this.state.email}</p>
                <p>Spotify Hash: {this.state.spotify_user_hash}</p>
            </div>


        )
    }
}

export default UserProfile