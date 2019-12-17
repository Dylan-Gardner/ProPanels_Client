import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {logout } from './redux_actions/actions.js'

class Header extends React.Component {
    constructor(props){
        super(props);
    }

    logout = (event) => {
        fetch('/api/v1/auth/sign_out', {
            method: 'DELETE', 
            headers: {
                uid: this.props.uid,
                client: this.props.client_id,
                'access-token': this.props.access_token
            }
          });
        this.props.onLogout();
    }

    render() {
        return(
            <Navbar bg={"primary"} variant={"dark"}>
                <Navbar.Brand>Workflow</Navbar.Brand>
                <Navbar.Collapse className={"justify-content-end"}>
                    <Navbar.Text>
                        Signed in as:
                    </Navbar.Text>
                    <Nav>
                        <NavDropdown title={this.props.username}  id={"nav-dropdown"} alignRight>
                            <NavDropdown.Item href={"/user_profile"}>Profile</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item>
                                <button className="btn default" onClick={this.logout}>
                                    Logout
                                </button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

Header.propTypes = {
    token: PropTypes.string.isRequired
};
function mapStateToProps(state) {
    return {
        username: state.session.username,
        client_id: state.session.client_id,
        access_token: state.session.token,
        uid: state.session.uid

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      onLogout: () => { dispatch(logout()) }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Header);