import React, { Component } from 'react';

import { FormControl, InputGroup } from 'react-bootstrap';
import { percentage } from '../../utils/formatter';
import { InputGroupText } from 'react-bootstrap/InputGroup';

export class PercentageEdit extends Component<any, any> {
    constructor (props : any) {
        super(props);

        const {value} = props;
        let fieldValue = value? parseFloat(value) * 100 : '';

        this.state = {
            fieldValue
        };
    }

    componentWillReceiveProps (props : any) {
        const {value} = props;
        let fieldValue = value? parseFloat(value) * 100 : '';

        this.setState({
            fieldValue
        })
    }

    onChangeText (e : any) {
        e.preventDefault();
        this.setState({
            fieldValue: e.target.value
        });
    }

    onUpdateValue () {
        const value = parseFloat(this.state.fieldValue) / 100;
        this.props.onUpdate(value);
    }

    render () {
        return (
            <InputGroup>
                <FormControl value={this.state.fieldValue} onChange={this.onChangeText.bind(this)} onBlur={this.onUpdateValue.bind(this)}  />
                <InputGroup.Append><InputGroupText>%</InputGroupText></InputGroup.Append>       
            </InputGroup>
        );
    }
}

export class PercentageView extends Component<any, any> {
    render () {
        const value = this.props.value as any;
        return (percentage(value));
    }
}