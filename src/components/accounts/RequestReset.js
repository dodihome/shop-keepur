import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Accounts from '../../lib/accounts/client';

import { Alert, Form, Button } from 'react-bootstrap';
import { isValidEmail } from '../../utils/validator';

export default class RequestReset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ''
        };
    }

    async onRequestReset (e) {
        e.preventDefault();

        if (!isValidEmail(this.state.email)) {
            this.setState({
                invalidEmailError:  'Invalid Email'
            })
        } else {
            try {
                const res = await Accounts.forgotPassword(this.state.email);    
                if (res.error) {
                    this.setState({error: res.error});
                } else {
                    this.setState({
                        message: 'Email sent.  Please check your inbox.'
                    })
        
                    const history = this.props.history;
                    setTimeout(()=> {
                        history.push('/');
                    }, 3000);    
                }
    
            } catch (err) {
                this.setState({error: err.message});
            }    
        }
    }

    gotoLogin (e) {
        e.preventDefault();

        if (this.props.popup) this.props.goLogin();
        else this.props.history.push('/user/login');
    }

    render () {
        return (
            <div className='auth login'>
                <Form onSubmit={this.onRequestReset.bind(this)}>
                    <Form.Control placeholder="Email" style={{marginBottom: '10px'}}
                        type='text'
                        isInvalid={this.state.invalidEmailError}
                        value={this.state.email}
                        onChange={(e)=> {e.preventDefault(); this.setState({invalidEmailError: null, email: e.target.value})}} />

                    {this.state.error?
                        <Alert variant='danger'>{this.state.error}</Alert> : null
                    }
                    {this.state.message?
                        <Alert variant='info'>{this.state.message}</Alert> : null
                    }
                    <Button block variant='primary' type="submit" disabled={this.state.invalidEmailError}>Request New Password</Button>
                    <Link to='/user/login'><Button block variant='link'>Cancel</Button></Link>
                </Form>
            </div>
        );
    }
}