import React from 'react';
import { titleCase } from 'title-case';
import { fromNow } from '../../utils/formatter';
import { Button, Table } from 'react-bootstrap';

const rolesMap = {
    'Member': 'Team Member',
    'Manager': 'Manager',
    'Owner': 'Owner'
};

export const Invitation = (props) => {
    const {invitation, onRescind, onResend } = props;
    const {from, to, role, timestamp, token} = invitation;

    const buttonStyle = {marginLeft: '10px'};
    return (
        <tr>
            <td>{titleCase(from.displayName)}</td>
            <td>{titleCase(to.name)} ({to.email}) as {rolesMap[role]}</td>
            <td>{fromNow(timestamp)}</td>
            <td>
                <Button style={buttonStyle} onClick={()=>{onResend(token)}} variant='outline-primary'>Resend</Button>
                <Button style={buttonStyle} onClick={()=>{onRescind(token)}} variant='outline-danger'>Rescind</Button>
            </td>
        </tr>
    )
}

export const PendingInvitations = (props) => {
    const {invitations, onRescind, onResend } = props;

    return (
        <Table responsive striped hover>
            <thead>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>When</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {
                    invitations.map((iv, idx) => {
                        return <Invitation key={idx} invitation={iv} onRescind={onRescind} onResend={onResend} />
                    })
                }
            </tbody>
        </Table>
    )
}