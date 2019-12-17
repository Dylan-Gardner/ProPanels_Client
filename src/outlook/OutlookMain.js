import React from "react"
import '../spotify.css'
import ScheduleView from "./ScheduleView";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
var moment = require('moment');

class OutlookMain extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events: null,
            name: null
        }
    }

    componentDidMount() {
        this.getUserInfo();
    }


    async getUserInfo() {
        const events = await this.getUserEvents();
        const name = await this.getUser();
        for(let i = 0; i < events.length; i++) {
            var date = new Date(events[i]['startDate'] + ' UTC');
            events[i]['startDate'] = moment(date.toString()).format("YYYY-MM-DD HH:mm");
            date = new Date(events[i]['endDate'] + ' UTC');
            events[i]['endDate'] = moment(date.toString()).format("YYYY-MM-DD HH:mm");
        }
        this.setState({
            events: events,
            name: name
        })
    }

    async getUserEvents(){
        const response = await fetch('/api/v1/outlook/get_calendar_events', {
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
        return data.events;
    }

    async getUser() {
        const response = await fetch('/api/v1/outlook/user_info', {
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
        return data.name;
    }

    render() {
        return(
            <div>
                {this.state.events != null &&
                    <ScheduleView events={this.state.events}/>}
            </div>
                    );
    }
}

OutlookMain.propTypes = {
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
export default connect(mapStateToProps)(OutlookMain);