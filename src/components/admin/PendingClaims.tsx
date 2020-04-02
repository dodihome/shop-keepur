import React from "react";

import { PhoneView } from "../widgets/Phone";
import { fromNow } from "../../utils/formatter";
import { Button, Alert, Table, Dropdown, DropdownButton, Badge } from "react-bootstrap";
import Admin from "../../lib/admin/client";

class ClaimsRow extends React.Component<any, any> {
    state: any = {} as any;
    async onAccept (e : any) {
        e.preventDefault();

        const claimId = e.target.value;
        const userId = this.props.user.id;
        const { error } = await Admin.acceptClaim (claimId, userId);
        if (error) {
            this.setState({error});
        }
    }

    async onReject (claimId: string, reason: string, e: any) {
        e.preventDefault();

        const userId = this.props.user.id;
        const { error } = await Admin.rejectClaim (claimId, userId, reason);
        if (error) {
            this.setState({error});
        }
    }

    render () {
        const {biz, user, idx} = this.props;

        return (
            <tr key={biz.id}>
                <td>{idx+1}</td>
                <td className='biz-cell'>
                    <span className='name'>{biz.name}</span>
                    <span className='info'>{biz.address.inputText}</span>
                    {biz.phone?
                    <span className='info'><PhoneView phone={biz.phone} /></span> : null
                    }
                    {biz.website?
                    <span className='info'><a href={biz.website}>{biz.website}</a></span> : null
                    }
                </td>
                <td className='claim-cell'>
                    {
                        biz.claims.map((c)=>{
                            return <div key={c._id} className='claim'>
                                <span className='claimed-by'>{c.claimedBy.displayName} ({c.role})</span>
                                <span className='when'>{fromNow(c.ts)}</span>
                                {
                                    c.processed?
                                    <Badge variant='info'>{c.state}</Badge>
                                    :
                                    <span className='actions'>
                                        <Button variant='outline-primary' value={c._id} onClick={this.onAccept.bind(this)}>Accept</Button>
                                        <DropdownButton id='reject-button' title='Reject' variant='outline-danger'>
                                            <Dropdown.Item onClick={this.onReject.bind(this, c._id, 'Called store')}>Called store</Dropdown.Item>
                                            <Dropdown.Item onClick={this.onReject.bind(this, c._id, 'Checked business registration')}>Checked business registration</Dropdown.Item>
                                        </DropdownButton>
                                    </span> 
                                }
                                {
                                    this.state.error? 
                                    <div>
                                        <Alert variant='danger'>{this.state.error}</Alert>
                                    </div>
                                    : null
                                }
                            </div>
                        })
                    }
                </td>
            </tr>
        )
    }
}

export class PendingClaims extends React.Component<any, any> {
    state : any = {bizz: []} as any;

    async componentDidUpdate (oldProps: any, oldState: any) {
        if (this.props.user !== oldProps.user) {
            const { user } = this.props;
            if (!user) return;
    
            const { error, bizz } = await Admin.listPendingClaims(user.id);
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
                            <th>Claimed By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.bizz.map ((biz, idx) => {
                                return <ClaimsRow key={biz.id} user={this.props.user} biz={biz} idx={idx} history={this.props.history} />
                            })
                        }
                    </tbody>
                </Table>            
            </div>
        )
    }
}
