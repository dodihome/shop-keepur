import React from "react";

import { PhoneView } from "../widgets/Phone";
import { Alert, Table, Button } from "react-bootstrap";
import Admin from "../../lib/admin/client";

class UnclaimedRow extends React.Component<any, any> {
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
                    <span className='actions'>
                        <Button variant='outline-primary'>Invite Owner/Manager</Button>
                        <Button variant='outline-danger'>Delete</Button>
                    </span>
                </td>
            </tr>
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
