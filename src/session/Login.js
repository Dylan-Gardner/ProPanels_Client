import React from "react";
import { Button, Card, Form, Row, Col  } from "react-bootstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import '../session.css'
import {login } from '../redux_actions/actions.js'
import {Redirect} from 'react-router-dom'

class Login extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          email: '',
          password: '',
          errorMessage: '',
      };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 6;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.getUserAsync().then(response => {
            if(response[1].success == false){
                this.setState({errorMessage: response[1].errors[0]});
            }
            else{
              const headers = response[0];
              const json = response[1];
              console.log(json);
              this.props.onLogin(headers.get('access-token'), json.data.name, json.data.email,headers.get('uid'), headers.get('client'), headers.get('expiry'));
              this.props.history.push('/')
            }
        });
  }

  async getUserAsync() {
    const {email, password, errorMessage} = this.state;
    let response = await fetch('/api/v1/auth/sign_in', {
      method: 'POST', 
      headers: {
          email: email,
          password: password
      }
    });
    let data = await response.json();
    return [response.headers, data];
  }

  renderRedirect = () => {
    if(this.props.isLoggedIn) {
      return <Redirect to= '/'/>
    }
  }


  signUp = (event) => {
      event.preventDefault();
      this.props.history.push('/sign_up')
  }


  render() {
      return(
        <Row className="justify-content-center">
            {this.renderRedirect()}
            <Col className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <Card className="card-signin my-5">
                    <Card.Body>
                        <h5 className="card-title text-center">Sign In</h5>
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
                            <Form.Control type="password" id="inputPassword"
                            onChange={e => this.setState({password: e.target.value})} value={this.state.password} placeholder="Password" required/>
                            <Form.Label for="inputPassword">Password</Form.Label>
                        </Form.Group>

                        <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                            <label className="custom-control-label" for="customCheck1">Remember password</label>
                        </div>
                        <Button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.handleSubmit}>Sign in</Button>
                        <Button className="btn btn-lg btn-info btn-block text-uppercase" onClick={this.signUp}>New here? Sign Up</Button>
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

Login.propTypes = {
  token: PropTypes.string.isRequired,
};
function mapStateToProps(state) {
    return {
      isLoggedIn: state.session.isLoggedIn,
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (token, username, email, uid, client_id, expiry) => { dispatch(login(token, username, email, uid, client_id, expiry)) }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
