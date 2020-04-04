import React from 'react';
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import Cookies from 'js-cookie';
import Dodi from '../../utils/Dodi';

export class UserLocation extends React.Component < any, any> {
    state : any = { location: '' } as any;

    componentDidMount () {
        const location = Dodi.location();
        if (location) {
            this.setState ({location});
        }
    }

    onChange ( e: any) {
        e.preventDefault();
        const newState = {} as any;
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    setLocation ( e: any) {
        e.preventDefault();
        Cookies.set('location', this.state.location, { expires: 7, path: '/'});
    }

    render () {
        return (
            <Form onSubmit={this.setLocation.bind(this)}>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Location</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder='San Jose, CA' value={this.state.location}
                        name='location'
                        onChange={this.onChange.bind(this)}
                    />
                    <InputGroup.Append>
                        <Button type='submit'>Set</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        )
    }
}