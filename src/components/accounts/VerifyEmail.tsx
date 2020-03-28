import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Accounts from '../../lib/accounts/client';

export default class VerifyEmail extends Component<any, any> {
    state : any = {} as any;

    async componentDidMount () {
        const token = this.props.match.params.token;
        const res = await Accounts.verifyEmail(token);
        if (res.error) {
            this.setState({error: res.error});
        } else {
            this.setState ({message:  'Email verified. You will be redirected to the homepage in 5 seconds.'});
            const history = this.props.history;
            setTimeout(()=> {
                history.push('/');
            }, 5000);
        }
    }

    render () {
        return (
            <div className='auth login'>
                {this.state.error?
                    <Alert variant='danger'>{this.state.error}</Alert> : null
                }

                {this.state.message?
                    <Alert variant='info'>{this.state.message}</Alert> : null
                }

                <Link to='/'><Button block variant='secondary'>Okay</Button></Link>
            </div>
        );
    }
}