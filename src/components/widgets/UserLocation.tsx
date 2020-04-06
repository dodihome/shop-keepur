import React from 'react';
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import Dodi from '../../utils/Dodi';
import { isValidCityState } from '../../utils/validator';
import { titleCase } from 'title-case';

export class UserLocation extends React.Component < any, any> {
    state : any = { location: '' } as any;

    componentDidMount () {
        const location = titleCase(Dodi.location());
        if (location) {
            this.setState ({location});
        }
    }

    onChange ( e: any) {
        e.preventDefault();
        const newState = {validationError: false} as any;
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    _validate () {
        const isValid = isValidCityState (this.state.location);
        if (!isValid) {
            this.setState ({validationError: true})
        }
    }

    onBlur ( e: any) {
        e.preventDefault();
        this._validate();
    }

    setLocation ( e: any) {
        e.preventDefault();
        if (isValidCityState (this.state.location) ) {
            Dodi.getInstance().setLocation(this.state.location);
            if (this.props.isPopover) {
                window.location.reload(false);
            } else {
                this.props.history.go(-1);    
            }
        } else {
            this.setState({validationError: true})
        }
    }

    render () {
        const { hideLabel } = this.props;

        return (
            <Form onSubmit={this.setLocation.bind(this)}>
                <InputGroup>
                    {hideLabel ? null :
                    <InputGroup.Prepend>
                        <InputGroup.Text>Location</InputGroup.Text>
                    </InputGroup.Prepend>
                    }
                    <FormControl placeholder='City, State' value={this.state.location}
                        name='location'
                        onChange={this.onChange.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                        isInvalid={this.state.validationError}
                    />
                    <InputGroup.Append>
                        <Button variant='secondary' type='submit' disabled={this.state.validationError}>Set</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        )
    }
}