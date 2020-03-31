import React, { Component } from 'react';
import Accounts from '../../lib/accounts/client';

export default class Logout extends Component<any, any> {
    state : any = {} as any;

    async componentDidMount () {
        Accounts.logout();
        const history = this.props.history;
        history.push('/');
    }

    render () {
        return (
            <div className='auth login'>
                <h1>Logout</h1>
            </div>
        );
    }
}