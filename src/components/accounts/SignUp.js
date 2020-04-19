import React, { Component } from 'react';

import { Form, Button, Alert } from 'react-bootstrap';
import { isValidEmail } from '../../utils/validator';

import { Divider } from '../widgets/Divider';

import Accounts from '../../lib/accounts/client';

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        const {invitation} = props;
        if (invitation) {
            const [firstName, lastName] = invitation.to.name.split(/\s/);
            this.state= {
                firstName, lastName, 
                email: invitation.to.email,
                isEmailLocked: true
            }
        } else {
            this.state = {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                password2: '',
            };    
        }
    }

    onChangeEmail (e) {
        e.preventDefault();

        if (this.state.invalidEmailError)
            this.setState({
                email: e.target.value,
                invalidEmailError: false,
                errorReason: null
            });
        else
            this.setState ({email: e.target.value});
    }

    validateEmail (e) {
        e.preventDefault();

        if (isValidEmail(this.state.email))
            return;

        this.setState ({
            invalidEmailError: true
        });
    }

    onChangeFirstName (e) {
        e.preventDefault();

        this.setState({
            firstName: e.target.value
        })
    }

    onChangeLastName (e) {
        e.preventDefault();

        this.setState({
            lastName: e.target.value
        })
    }

    onChangePassword (e) {
        e.preventDefault();
        if (this.state.passwordsCompareError) 
            this.setState ({
                password: e.target.value,
                password2: '',
                passwordsCompareError: false,
                errorReason: null
            });
        else
            this.setState ({password: e.target.value});
    }

    onChangePassword2 (e) {
        e.preventDefault();
        if (this.state.passwordsCompareError)
            this.setState({
                password2: e.target.value,
                passwordsCompareError: false,
                errorReason: null
            })
        else
            this.setState ({password2: e.target.value});
    }

    onComparePasswords (e) {
        e.preventDefault();

        if (this.state.password === this.state.password2)
            return;

        this.setState ({
            passwordsCompareError: true,
            errorReason: 'Passwords do not match'
        });
    }

    async onSignUp (e) {
        e.preventDefault();
        const {email, password, firstName, lastName} = this.state;

        if (!email) {
            this.setState ({
                invalidEmailError: true,
                errorReason: 'Email cannot be empty'
            });
        } else if (!password) {
            this.setState ({
                passwordsCompareError: true,
                errorReason: 'Password cannot be empty'
            });
        } else if (password !== this.state.password2) {
            this.setState ({
                passwordsCompareError: true,
                errorReason: 'Passwords do not match'
            });
        } else {
            const res = await Accounts.signup (email, password, firstName, lastName);
            const {error} = res;

            if (error) {
                this.setState({
                    gotResult: true,
                    invalidEmailError: true,
                    errorReason: error
                })
            } else {
                this.setState({
                    gotResult: true,
                    message: 'Confirmation email sent to ' + email + '.'
                })
                this.props.onSuccess(res.user);
            }
        }
    }

    renderForm () {
        return (
            <div className='auth login'>
                <h1>Sign Up</h1>
                <Form onSubmit={this.onSignUp.bind(this)}>
                    <Form.Control placeholder="First Name" style={{marginBottom: '10px'}} 
                        type="text"
                        onChange={this.onChangeFirstName.bind(this)}
                        value={this.state.firstName}
                    />
                    <Form.Control placeholder="Last Name" style={{marginBottom: '10px'}} 
                        type="text"
                        onChange={this.onChangeLastName.bind(this)}
                        value={this.state.lastName}
                    />
                    <Form.Control placeholder="Email" style={{marginBottom: '10px'}} 
                        type="text"
                        readOnly={this.state.isEmailLocked} 
                        isInvalid={this.state.invalidEmailError}
                        onChange={this.onChangeEmail.bind(this)}
                        onBlur={this.validateEmail.bind(this)}
                        value={this.state.email}
                    />
                    <Form.Control placeholder="Password" type="password" 
                        style={{marginBottom: '10px'}}
                        value={this.state.password}
                        onChange={this.onChangePassword.bind(this)}
                        />
                    <Form.Control placeholder="Confirm Password" 
                        style={{marginBottom: '10px'}} 
                        type="password"
                        isInvalid={this.state.passwordsCompareError}
                        value={this.state.password2}
                        onChange={this.onChangePassword2.bind(this)}
                        onBlur={this.onComparePasswords.bind(this)}
                        />

                    {this.state.errorReason?
                        <Alert variant='danger'>{this.state.errorReason}</Alert> 
                        : null
                    }

                    {this.state.message?
                        <Alert variant='info'>{this.state.message}</Alert> 
                        : null
                    }

                    <Button block variant='primary' 
                        disabled={this.state.passwordsCompareError || this.state.invalidEmailError}
                        type="submit">Sign Up</Button>
                </Form>
                
                {
                    this.props.hideLoginLink? null
                    :
                    <React.Fragment>
                        <Divider />
                        <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                            <h6>Already have an account? 
                            <Button variant='link' 
                                onClick={()=> { this.props.goLogin() }} style={{paddingLeft: '20px'}}>Login</Button></h6>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }

    renderResult () {
        return (
            <div className='auth login'>
                {this.state.errorReason?
                    <Alert variant='danger'>{this.state.errorReason}</Alert> 
                    : null
                }

                {this.state.message?
                    <Alert variant='info'>{this.state.message}</Alert> 
                    : null
                }
                <Button variant='link' onClick={()=> { this.props.onCancel() } }>Okay</Button>
            </div>
        )
    }

    render () {
        if (this.state.gotResult) {
            return this.renderResult();
        } else {
            return this.renderForm();
        }
    }
}