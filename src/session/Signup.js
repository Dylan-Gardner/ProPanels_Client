import React from "react";
import { Button, Card, Form, Row, Col  } from "react-bootstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import '../session.css'
import {login } from '../redux_actions/actions.js'
import {Redirect} from 'react-router-dom'

class SignUp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            password_conf: '',
            username: '',
            errorMessage: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {email, password, password_conf, username } =this.state;
        if(password != password_conf){
            this.setState({errorMessage: 'Passwords Dont match'});
            return;
        }
        this.getUserAsync().then(response => {
            if(response[1].success == false){
                this.setState({errorMessage: response[1].errors[0]});
            }
            else{
                const headers = response[0];
                const json = response[1];
                this.props.onSignup(headers.get('access-token'), json.data.name, json.data.email,headers.get('uid'), headers.get('client'), headers.get('expiry'));
                this.props.history.push('/') 
            }
        });
        
    
    }

    async getUserAsync() 
    {
        const {email, password, password_conf, username } =this.state;
        let response = await fetch('/api/v1/auth', {
            method: 'POST',
            headers: {
                email: email,
                password: password,
                password_confirmation: password_conf,
                name: username
            }
        });
        let data = await response.json()
        return [response.headers, data];
    }

    login = (event) => {
        event.preventDefault();
        this.props.history.push('/login');
    }

    renderRedirect = () => {
        if(this.props.isLoggedIn) {
          return <Redirect to= '/'/>
        }
      }

    render() {
        return(
          <Row className="justify-content-center">
              {this.renderRedirect()}
              <Col className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                  <Card className="card-signin my-5">
                      <Card.Body>
                          <h5 className="card-title text-center">Sign Up</h5>
                          <h5 className='text-center'>{this.state.errorMessage}</h5>
                          <Form className="form-signin">
                          <Form.Group className="form-label-group">
                              <Form.Control type="email"
                              id="inputEmail"
                              placeholder="Email address"
                              required autofocus
                              value={this.state.email}
                              onChange={e => this.setState({email: e.target.value})}/>
                              <Form.Label for="inputEmail">Email address</Form.Label>
                          </Form.Group>

                          <Form.Group className="form-label-group">
                              <Form.Control type="text" id="inputUsername"
                              onChange={e => this.setState({username: e.target.value})} value={this.state.username} placeholder="Username" required/>
                              <Form.Label for="inputUsername">Username</Form.Label>
                          </Form.Group>
  
                          <Form.Group className="form-label-group">
                              <Form.Control type="password" id="inputPassword"
                              onChange={e => this.setState({password: e.target.value})} value={this.state.password} placeholder="Password" required/>
                              <Form.Label for="inputPassword">Password</Form.Label>
                          </Form.Group>

                          <Form.Group className="form-label-group">
                              <Form.Control type="password" id="inputPasswordConf"
                              onChange={e => this.setState({password_conf: e.target.value})} value={this.state.password_conf} placeholder="Password Confirmation" required/>
                              <Form.Label for="inputPasswordConf">Password Confirmation</Form.Label>
                          </Form.Group>
  
                          <div className="custom-control custom-checkbox mb-3">
                              <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                              <label className="custom-control-label" for="customCheck1">Remember password</label>
                          </div>
                          <Button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.handleSubmit}>Sign Up</Button>
                          <Button className="btn btn-lg btn-info btn-block text-uppercase" onClick={this.login}>Have an account? Login</Button>
                          <hr className="my-4"/>
                          <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
                          <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                          </Form>
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
    )};
}

SignUp.propTypes = {
    token: PropTypes.string.isRequired,
};
function mapStateToProps(state) {
    return {
      isLoggedIn: state.session.isLoggedIn,
    };
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (token, username, email, uid, client_id, expiry) => { dispatch(login(token, username, email, uid, client_id, expiry)) }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);