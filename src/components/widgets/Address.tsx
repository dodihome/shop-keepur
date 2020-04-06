import React, { Component } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { titleCase } from 'title-case';

import { US_States } from '../../helpers/contacts';
import { IAddress } from '../../lib/business/business.interface';
import { parseAddress } from '../../utils/validator';
import _ from 'lodash';

function formatAddress (address: IAddress) {
    const parts = [];
    if (address.street1) parts.push(titleCase(address.street1));
    if (address.street2) parts.push(titleCase(address.street2));
    if (address.city) parts.push(titleCase(address.city));
    if (address.state) parts.push(address.state.toUpperCase());

    let formattedAddress = parts.join(', ');
    if (address.zipcode) {
        formattedAddress = formattedAddress + ' ' + address.zipcode;
    }
    return formattedAddress;
}

export class AddressView extends Component<any, any> {
    render () {
        const { address } = this.props;
        const formattedAddress = formatAddress(address as IAddress);

        return (
            <span className="address">
                {address? formattedAddress : '--'}
            </span>
        )
    }
}

export class SimpleAddressEdit extends Component<any, any> {
    state : any = {addressStr: ''} as any;

    componentDidUpdate(oldProps: any, oldState: any) {
        if (oldProps !== this.props) {
            const {address} = this.props;
            const formattedAddress = formatAddress(address as IAddress);
            this.setState({
                addressStr: formattedAddress,
                _id: address._id
            })    
        }
    }

    onChange (e : any) {
        e.preventDefault();
        this.setState({
            addressStr : e.target.value,
            validationError: false
        });
    }

    onBlur (e : any) {
        e.preventDefault();
        const addr = parseAddress(this.state.addressStr);
        console.log({addr});
        if (!addr.city || !addr.state) {
            this.setState({validationError: true});
        } else {
            const stateIdx = _.indexOf(US_States, addr.state);
            console.log(stateIdx);
            if (stateIdx < 0) {
                this.setState({validationError: true});
            } else {
                addr._id = this.state._id;
                this.props.onUpdate(addr);    
            }
        }
    }

    render () {
        return (
            <div className='address edit'>
                <FormControl value={this.state.addressStr} 
                    isInvalid={this.state.validationError}
                    onChange={this.onChange.bind(this)} 
                    onBlur={this.onBlur.bind(this)} />
            </div>
        )
    }
}

export class AddressEdit extends Component<any, any> {
    state : any = {street1: '', city: '', state: ''} as any;

    componentDidMount () {
        const { address } = this.props;
        if (address) {
            this.setState({
                _id: address._id,
                street1: address.street1,
                city: address.city,
                state: address.state,
                isDirty: false
            })
        }
    }

    componentDidUpdate (oldProps : any) {
        if (this.props !== oldProps) {
            const {address } = this.props;
            if (address) {
                this.setState({
                    _id: address._id,
                    street1: address.street1,
                    city: address.city,
                    state: address.state,
                    isDirty: false
                })
            }    
        }
    }

    onChange ( e: any) {
        e.preventDefault();
        const newState = {} as any;
        newState[e.target.name] = e.target.value;
        newState.isDirty = true;
        this.setState(newState);
    }

    onBlur (e : any) {
        e.preventDefault();
        if (this.state.isDirty) {
            setTimeout(this.updateAddress.bind(this), 300);
        }
    }

    updateAddress () {
        if (this.state.isDirty) {
            const newAddress = {
                _id: this.state._id,
                street1: this.state.street1,
                city: this.state.city,
                state: this.state.state
            } as IAddress;
            this.props.onUpdate(newAddress);
        }
    }

    render () {
        const { id, street1, city, state } = this.state;
        return (
            <div className='address edit'>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text><i className='fa fa-map-marker-alt' /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl 
                        placeholder='Street'
                        name='street1'
                        value={street1}
                        isInvalid={this.state.validationError}
                        onChange={this.onChange.bind(this)}
                        onBlur={this.onBlur.bind(this)} />
                    <FormControl 
                        placeholder='City'
                        name='city'
                        value={city}
                        isInvalid={this.state.validationError}
                        onChange={this.onChange.bind(this)}
                        onBlur={this.onBlur.bind(this)} />
                    <InputGroup.Append>
                        <FormControl as='select' 
                            name='state'
                            onChange={this.onChange.bind(this)}
                            onBlur={this.onBlur.bind(this)}
                            value={state}>
                                <option key='empty' value=''>-</option>
                            {
                                US_States.map((st : string) => {
                                    return <option key={st} value={st}>{st}</option>
                                })
                            }
                        </FormControl>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
}
