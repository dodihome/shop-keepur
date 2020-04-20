import React from 'react';
import { InviteTeamMember } from './InviteTeam';
import { Table } from 'react-bootstrap';

export const PeopleInGroupView = (props) => {
    const { persons, onInvite } = props;

    return (
        <div className='team-members'>
            <h3>Team</h3>
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {persons.map((p)=> {
                        console.log({p});
                        return (<tr key={p._id}>
                            <td>{p.person.firstName} {p.person.lastName}</td>
                            <td>{p.role}</td>
                        </tr>)
                    })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={2} style={{backgroundColor: 'beige'}}>
                            <InviteTeamMember onInvite={onInvite} />
                        </th>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}