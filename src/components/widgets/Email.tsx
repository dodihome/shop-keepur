import React, { Component } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

import { isValidEmail } from '../../utils/validator';

var _ = require ('lodash');

const sideLinkStyle = {
    display: 'inline-block',
    textAlign: 'right',
    paddingTop: '7px',
    paddingLeft: '20px'
} as any;

export class EmailView extends Component<any, any> {
    render () {
        const {email } = this.props;
        const link = "mailto:" + email;
        return (
            <span className="email">
                <a href={link}>{email}</a>
            </span>
        )
    }
}

export class EmailEdit extends Component<any, any> {
    constructor (props : any) {
        super (props);
        this.state = {
            email: props.email? props.email : '',
            isDirty: false
        };
    }

    componentWillReceiveProps (props : any) {
        this.setState({
            email: props.email? props.email : '',
            isDirty: false
        })
    }

    onMore (e : any) {
        e.preventDefault();
        this.props.onMore('emails');
    }

    onDelete (e : any) {
        e.preventDefault();
        this.props.onDelete('emails', this.props.idx);
    }

    onChange (e : any) {
        e.preventDefault();
        this.setState ({
            email: e.target.value,
            isDirty: true,
            validateionError: false
        });
    }

    onBlur (e : any) {
        e.preventDefault();
        if (this.state.isDirty) {
            if (this.state.email) {
                if (isValidEmail(this.state.email))
                    this.props.onUpdate ('emails', this.props.idx, this.state.email);
                else 
                    this.setState({validateionError: true});
            } else {
                this.props.onDelete('emails', this.props.idx);
            }
        }
    }

    render () {
        const {email} = this.state;

        return (
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text><i className='fas fa-at' /></InputGroup.Text>
                </InputGroup.Prepend>

                <FormControl placeholder='Email'
                    value={email}
                    isInvalid={this.state.validateionError}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                />
                    {
                        this.props.onMore?
                        <InputGroup.Append>
                            <span style={sideLinkStyle}><a onClick={this.onMore.bind(this)}>+ email</a></span>
                        </InputGroup.Append>
                        : null
                    }
                    {
                        this.props.onDelete?
                        <InputGroup.Append>
                            <span style={sideLinkStyle}><a onClick={this.onDelete.bind(this)}>delete</a></span>
                        </InputGroup.Append>
                        : null
                    }
            </InputGroup>
        );
    }
}
