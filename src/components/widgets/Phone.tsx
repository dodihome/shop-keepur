import React, { Component } from 'react';
import { FormControl, InputGroup, Form } from 'react-bootstrap';

import { reformatPhoneNumber } from '../../helpers/contacts';
import { isPhoneNumber } from '../../utils/validator';
import { titleCase } from 'title-case';

const phoneLabelOptions = [
    {key: 'default', text: '-', value: ''},
    {key: 'mobile', text: 'Mobile', value: 'mobile'},
    {key: 'business', text: 'Business', value: 'business'},
] as any;

const sideLinkStyle = {
    display: 'inline-block',
    textAlign: 'right',
    paddingTop: '7px',
    paddingLeft: '20px'
} as any;

export class PhoneView extends Component<any, any> {
    render () {
        const { phone } = this.props;

        return (
            <span className="phoneNumber">
                {
                    phone?
                    <React.Fragment>
                        <span>{phone.number}</span>
                        <label>({titleCase(phone.label)})</label>
                    </React.Fragment>
                    :
                    <span>--</span>
                }
            </span>
        )
    }
}

export class PhoneEdit extends Component<any, any> {
    constructor (props : any) {
        super (props);
        if (props.phone) {
            this.state = {
                label: props.phone.label,
                number: props.phone.number,
                canReceiveText: props.phone.canReceiveText,
                isDirty: false
            };
        }
    }

    componentWillReceiveProps (props : any) {
        if (props.phone) {
            this.setState({
                label: props.phone.label,
                number: props.phone.number,
                canReceiveText: props.phone.canReceiveText,
                isDirty: false
            })
        }
    }

    onMore (e : any) {
        e.preventDefault();
        this.props.onMore('phones');
    }

    onDelete (e : any) {
        e.preventDefault();
        this.props.onDelete('phones', this.props.idx);
    }

    onChangeNumber (e : any) {
        e.preventDefault();
        this.setState ({
            number: e.target.value,
            validationError: false,
            isDirty: true
        });
    }

    onChangeLabel (e : any) {
        e.preventDefault();

        const val = e.target.value;
        this.setState({
            label: val,
            canReceiveText: val === 'mobile'? true: false,
            isDirty: true
        });
        setTimeout(this.updatePhoneNumber.bind(this), 100);  // give sometime for state to update
    }

    onChangeReceiveText (e : any) {
        e.preventDefault();

        this.setState ({
            canReceiveText: e.target.checked,
            isDirty: true
        });
        setTimeout(this.updatePhoneNumber.bind(this), 100);  // give sometime for state to update
    }

    onBlur (e : any) {
        e.preventDefault();
        if (this.state.isDirty) {
            if (this.state.number)
                this.updatePhoneNumber();
            else
                this.props.onDelete('phones', this.props.idx);
        }
    }

    updatePhoneNumber () {
        if (this.state.isDirty) {
            const num = this.state.number;
            if (isPhoneNumber(num)) {
                const formattedNum = reformatPhoneNumber(num);
                const newPhone = {
                    label: this.state.label,
                    number: formattedNum,
                    canReceiveText: this.state.canReceiveText
                };

                if (this.props.onMore) {
                    this.props.onUpdate ('phones', this.props.idx, newPhone);
                } else {
                    this.props.onUpdate (newPhone);
                }

                this.setState({
                    number: formattedNum
                });
    
            } else {
                if (num.trim().length > 0)
                    this.setState({validationError: true});
            }
        }
    }

    render () {
        return (
            <div className='phone edit'>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text><i className='fa fa-phone' /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl 
                        placeholder='Phone Number'
                        value={this.state.number}
                        isInvalid={this.state.validationError}
                        onChange={this.onChangeNumber.bind(this)}
                        onBlur={this.onBlur.bind(this)} />
                    <InputGroup.Append>
                        <FormControl as='select' 
                            onChange={this.onChangeLabel.bind(this)}
                            value={this.state.label}>
                            {
                                phoneLabelOptions.map((pl : any) => {
                                    return <option key={pl.key} value={pl.value}>{pl.text}</option>
                                })
                            }
                        </FormControl>
                    </InputGroup.Append>
                    <InputGroup.Append>
                        <Form.Check
                            type='checkbox'
                            checked={this.state.canReceiveText}
                            onChange={this.onChangeReceiveText.bind(this)}
                            label="Can Receive Text Message"
                        />                            
                    </InputGroup.Append>

                    {
                        this.props.onMore?
                        <InputGroup.Append>
                            <span style={sideLinkStyle}><a onClick={this.onMore.bind(this)}>+ phone</a></span>
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
            </div>
        )
    }
}
