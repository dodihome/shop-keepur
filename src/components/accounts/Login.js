import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Form, Alert, Button } from 'react-bootstrap';

import { Divider } from '../widgets/Divider';
import Accounts from '../../lib/accounts/client';

export default class Login extends Component {
    constructor(props) {
        super(props);
        const { email } = props;

        if (email) {
            this.state = {
                email, password: '', isEmailLocked: true
            }
        } else {
            this.state = {
                email: '',
                password: ''
            }    
        }
    }

    onChangeEmail (e) {
        e.preventDefault();
        if (this.state.loginError) {
            this.setState ({email: e.target.value, loginError: ''});
        } else {
            this.setState({email: e.target.value});
        }
    }

    onChangePassword (e) {
        e.preventDefault();
        if (this.state.loginError) {
            this.setState({password: e.target.value, loginError: ''});
        } else {
            this.setState({password: e.target.value});
        }
    }

    async onLogin (e) {
        e.preventDefault();

        if (!this.state.email) {
            this.setState ({loginError: 'Email cannot be empty'});
            return;
        } else if (!this.state.password) {
            this.setState ({loginError: 'Password cannot be empty'});
            return;
        }

        const { email, password } = this.state;
        const self = this;
        Accounts.login (email, password, (error, user) => {
            if (error) {
                this.setState({loginError: error});
            } else {
                self.props.onSuccess (user);
            }
        })            
    }

    render () {
        const { email, isEmailLocked } = this.state;
        let obsEmail = '';
        if (isEmailLocked) {
            const bits = /^(.+)@(.+)$/.exec(email);
            obsEmail = bits[1][0] + '***' + '@' + bits[2];
        }

        return (
            <div className='auth login'>
                <h1>Login</h1>
                <Form onSubmit={this.onLogin.bind(this)}>
                    {
                        isEmailLocked ?
                        <Form.Text>{obsEmail} <br/><i>(email is obfuscated for security reasons)</i></Form.Text>
                        :
                        <Form.Control placeholder="Email" style={{marginBottom: '10px'}} 
                            type='text'
                            onChange={this.onChangeEmail.bind(this) }
                            value={this.state.email} /> 
                    }
                    <Form.Control placeholder="Password" style={{marginBottom: '10px'}} 
                        type="password"
                        onChange={this.onChangePassword.bind(this)}
                        value={this.state.password} />

                    {this.state.loginError?
                        <Alert variant='danger'>{this.state.loginError}</Alert> : null
                    }
                        
                    <Button block variant='primary' type="submit">Login</Button>
                    {
                        this.props.onCancel?
                        <Button block variant='link' onClick={ ()=> {this.props.onCancel() } }>Cancel</Button>
                        : null
                    }
                </Form>

                {
                    this.props.hideSignupLink? null :
                    <React.Fragment>
                        <Divider />
                        <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-evenly'}}>
                            <Link to='/user/forgot-password' className='btn btn-link'>Forgot Password</Link>
                            <Link to='/user/sign-up' className='btn btn-link'>Sign Up</Link>
                        </div>                        
                    </React.Fragment>    
                }
            </div>
        );
    }
}