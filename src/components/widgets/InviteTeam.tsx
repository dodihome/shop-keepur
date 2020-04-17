import React, { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { isValidEmail } from '../../utils/validator';

const roleOptions = [
    { value: '', label: '[Role]'},
    { value: 'Owner', label: 'Owner'},
    { value: 'Manager', label: 'Manager'}, 
    { value: 'Member', label: 'Team Member'}
];
export const InviteTeamMember = (props) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ role, setRole ] = useState('Member');
    const [ invalidName, setInvalidName ] = useState(false);
    const [ invalidEmail, setInvalidEmail ] = useState(false);

    const onChangeName = (e) => {
        e.preventDefault();
        setName(e.target.value);
        if (invalidName) {
            setInvalidName(false);
        }
    }

    const onChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);

        if (invalidEmail) setInvalidEmail(false);
    }

    const onChangeRole = (e) => {
        e.preventDefault();
        setRole(e.target.value);
    }

    const onBlurEmail = (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setInvalidEmail(true);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            setInvalidName (true);
        } else {
            props.onInvite(name, email, role);
            setName('');
            setEmail('');
            setRole('Member');
        }
    }

    return (
        <Form>
            <InputGroup>
                <FormControl value={name} placeholder='Name' onChange={onChangeName} isInvalid={invalidName} />
                <FormControl value={email} placeholder='Email' onChange={onChangeEmail} onBlur={onBlurEmail} isInvalid={invalidEmail} />
                <FormControl value={role} as='select' onChange={onChangeRole}>
                    {
                        roleOptions.map((op, idx) => {
                            return <option key={idx} value={op.value}>{op.label}</option>
                        })
                    }
                </FormControl>
                <InputGroup.Append>
                    <Button variant='primary' disabled={invalidName || invalidEmail} onClick={onSubmit}>Invite</Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    )
}