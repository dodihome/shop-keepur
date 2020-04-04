import React, { Component } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { reformatWebsite } from '../../helpers/contacts';

export class WebsiteView extends Component<any, any> {
    render () {
        const { website } = this.props;
        const link = website;
        return (
            <span className="website">
                <a href={link}>{website}</a>
            </span>
        )
    }
}

export class WebsiteEdit extends Component<any, any> {
    constructor (props : any) {
        super (props);
        this.state = {
            website: props.website? props.website : '',
            isDirty: false
        };
    }

    componentWillReceiveProps (props : any) {
        this.setState({
            website: props.website? props.website : '',
            isDirty: false
        })
    }

    onChange (e : any) {
        e.preventDefault();
        this.setState ({
            website: e.target.value,
            isDirty: true
        });
    }

    onBlur (e : any) {
        e.preventDefault();
        if (this.state.isDirty) {
            const ws = reformatWebsite(this.state.website);
            this.props.onUpdate (ws);
        }
    }

    render () {
        const {website} = this.state;

        return (
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text><i className='fa fa-globe' /></InputGroup.Text>
                </InputGroup.Prepend>

                <FormControl placeholder='Website'
                    value={website}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                />
            </InputGroup>
        );
    }
}
