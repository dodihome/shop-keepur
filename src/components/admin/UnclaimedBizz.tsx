import React from "react";

import { PhoneView } from "../widgets/Phone";
import { Alert, Table, Button } from "react-bootstrap";
import Admin from "../../lib/admin/client";
import { AddressView } from "../widgets/Address";
import { InviteTeamMember } from "../widgets/InviteTeam";
import { PendingInvitations } from "../widgets/PendingInvitations";
import { Divider } from "../widgets/Divider";
import Bizz from "../../lib/business/client";

class UnclaimedRow extends React.Component<any, any> {
    state : any = {showForm: false, invitations: []} as any;

    async onInvite (name, email, role, bizId) {
        const userId = this.props.user.id;
        await Bizz.inviteTeamMember(bizId, userId, name, email, role);
        
        this.setState({showForm: false});
    }

    async onResend (token: string) {
        const userId = this.props.user.id;
        await Bizz.resendInvitation(token, userId);

        this.setState({showForm: false});
    }

    async onRescind (token: string) {
        const userId = this.props.user.id;
        await Bizz.rescindInvitation(token, userId);

        this.setState({showForm: false});
    }

    async _fetchInvitations () {
        const userId = this.props.user.id;
        const bizId = this.props.biz.id;

        const { error, invitations } = await Bizz.getInvitations(bizId, userId);
        if (invitations) {
            this.setState({invitations});
        }
    }

    onShowForm () {
        this._fetchInvitations();
        this.setState({showForm: true});
    }

    render () {
        const {biz, user, idx} = this.props;

        const invitations = this.state.invitations;
        return (
            <React.Fragment>
                <tr>
                    <td>{idx+1}</td>
                    <td className='biz-cell'>
                        <span className='name'>{biz.name}</span>
                        <span className='info'><AddressView address={biz.address} /></span>
                        {biz.phone?
                        <span className='info'><PhoneView phone={biz.phone} /></span> : null
                        }
                        {biz.website?
                        <span className='info'><a href={biz.website}>{biz.website}</a></span> : null
                        }
                    </td>
                    <td className='claim-cell'>
                        <span className='actions'>
                            {
                                this.state.showForm?
                                <Button variant='outline-secondary' onClick={()=> {this.setState({showForm: false})}}>Hide Invites</Button>
                                :
                                <Button variant='outline-primary' onClick={this.onShowForm.bind(this)}>Show Invites</Button>
                            }
                            <Button variant='outline-danger'>Delete</Button>
                        </span>
                    </td>
                </tr>
                {
                    this.state.showForm?
                    <tr>
                        <td>&nbsp;</td>
                        <td colSpan={2}>
                            <InviteTeamMember bizId={biz.id} onInvite={this.onInvite.bind(this)} />
                            <Divider text='Pending Invitations' style={{marginTop: '20px', marginBottom: '20px'}} />
                            <PendingInvitations invitations={invitations} />
                        </td>
                    </tr>
                    : null
                }
            </React.Fragment>
        )
    }
}

export class Unclaimed extends React.Component<any, any> {
    state : any = {bizz: []} as any;

    async componentDidUpdate (oldProps: any, oldState: any) {
        if (this.props.user !== oldProps.user) {
            const { user } = this.props;
            if (!user) return;
    
            const { error, bizz } = await Admin.listUnclaimed(user.id);
            this.setState ({
                error, bizz
            })
        }
    }

    render () {
        return (
            <div className='tab-content'>
                {
                    this.state.error ?
                    <Alert variant='danger'>{this.state.error}</Alert> : null
                }
                <Table responsive striped bordered hover className='biz-table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Business</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.bizz.map ((biz, idx) => {
                                return <UnclaimedRow key={biz.id} user={this.props.user} biz={biz} idx={idx} history={this.props.history} />
                            })
                        }
                    </tbody>
                </Table>            
            </div>
        )
    }
}
