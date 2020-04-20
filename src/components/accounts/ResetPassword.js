import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Accounts from '../../lib/accounts/client';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            password2: ''
        };
    }

    onChangePassword (e) {
        e.preventDefault();
        if (this.state.passwordsCompareError || this.state.errorReason) 
            this.setState ({
                password: e.target.value,
                password2: '',
                passwordsCompareError: false,
                errorReason: ''
            });
        else
            this.setState ({password: e.target.value});
    }

    onChangePassword2 (e) {
        e.preventDefault();
        if (this.state.passwordsCompareError)
            this.setState({
                password2: e.target.value,
                passwordsCompareError: false
            })
        else
            this.setState ({password2: e.target.value});
    }

    onComparePasswords (e) {
        e.preventDefault();

        if (this.state.password === this.state.password2)
            return;

        this.setState ({
            passwordsCompareError: true
        });
    }

    async onResetPassword (e) {
        e.preventDefault();
        const {password} = this.state;
        const token = this.props.match.params.token;

        if (!password) {
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
            const res = await Accounts.resetPassword (token, password);

            if (res.error) {
                this.setState ({
                    errorReason: res.error
                });
            } else {
                this.props.history.push('/user/profile');
            }
        }
    }

    render () {
        let submitLabel = "Reset Password";
        if (this.props.enrollment) 
            submitLabel = "Create Password";

        return (
            <div className='auth login'>
                <h1>Reset Password</h1>
                <Form onSubmit={this.onResetPassword.bind(this)}>
                    <Form.Control placeholder="New Password" type="password" 
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
                        <Alert variant='danger'>{this.state.errorReason}</Alert> : null
                    }

                    <Button block variant='primary' type="submit">{submitLabel}</Button>
                    <Link to='/user/login'><Button block variant='link'>Cancel</Button></Link>
                </Form>
            </div>
        );
    }
}