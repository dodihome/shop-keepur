import React from 'react';
import { withAuth } from '../../utils/withAuth';
import DefaultLayout from '../../components/layout/default';
import { Tabs, Tab } from 'react-bootstrap';

import './admin.scss';
import { PendingClaims } from '../../components/admin/PendingClaims';
import { Unclaimed } from '../../components/admin/UnclaimedBizz';



class BizzAdmin extends React.Component<any, any> {
    state : any = {active: 'claims'};

    render () {
        const { user, history } = this.props;
        return (
            <DefaultLayout>
                <div className='admin bizz'>
                    <h1>Manage Businesses</h1>
                    <Tabs id="bizztabs" activeKey={this.state.active} onSelect={(k)=>{this.setState({active: k})}} >
                        <Tab eventKey='claims' title='Pending Claims'>
                            <PendingClaims user={this.props.user} history={history} />
                        </Tab>
                        <Tab eventKey='unclaimed' title='Unclaimed'>
                            <Unclaimed user={this.props.user} history={history} />
                        </Tab>
                    </Tabs>
                </div>
            </DefaultLayout>
        )
    }
}

export default withAuth(BizzAdmin);