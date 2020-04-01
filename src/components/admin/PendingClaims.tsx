import React from "react";

import { PhoneView } from "../widgets/Phone";
import { fromNow } from "../../utils/formatter";
import { Button, Alert, Table } from "react-bootstrap";
import Bizz from "../../lib/business/client";

class ClaimsRow extends React.Component<any, any> {
    render () {
        const {biz, user, idx} = this.props;
        const numOfClaims = biz.claims.length;

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
                                <span className='claimed-by'>{c.userName} ({c.role})</span>
                                <span className='when'>{fromNow(c.ts)}</span>
                                <span className='actions'>
                                    <Button variant='outline-primary'>Accept</Button>
                                    <Button variant='outline-danger'>Reject</Button>
                                </span>
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
    
            const { error, bizz } = await Bizz.listPendingClaims(user.id);
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
