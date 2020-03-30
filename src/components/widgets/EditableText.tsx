import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

export default class EditableText extends Component<any, any> {

    constructor (props: any) {
        super(props);

        this.state = {
            editMode: false,
            value: props.value
        };
    }

    componentWillReceiveProps (props: any) {
        this.setState ({
            value: props.value
        });
    }

    onClickText (e: any) {
        e.preventDefault();
        this.setState ({
            editMode: true
        });
    }

    onChange (e: any) {
        e.preventDefault();

        this.setState ({
            value: e.target.value
        });
    }

    onBlur (e: any) {
        e.preventDefault ();

        if (this.state.value != this.props.value)
            this.props.onUpdate(this.state.value);

        this.setState ({
            editMode: false
        });
    }

    render () {
        const {value} = this.props;

        if (this.state.editMode) {
            return (
                <FormControl value={this.state.value}
                    onChange={this.onChange.bind(this)} 
                    onBlur={this.onBlur.bind(this)}>
                </FormControl>
            );
        } else {
            return (
                <span onClick={this.onClickText.bind(this)}>
                    {value}
                </span>
            );
        }
    }
}
