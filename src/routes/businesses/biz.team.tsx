import React from 'react';
import { withAuth } from "../../utils/withAuth"
import DefaultLayout from '../../components/layout/default';
import { AddressView } from '../../components/widgets/Address';
import { PhoneView } from '../../components/widgets/Phone';
import { TagsView } from '../../components/widgets/TagsEdit';
import Bizz from '../../lib/business/client';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Divider } from '../../components/widgets/Divider';
import { InviteTeamMember } from '../../components/widgets/InviteTeam';
import { PendingInvitations } from '../../components/widgets/PendingInvitations';
import { PeopleInGroupView } from '../../components/widgets/PeopleInGroup';

class ManageTeam extends React.Component<any, any> {
    state : any = {} as any;

    async _load () {
        if (!this.props.user) return;

        const userId = this.props.user.id;
        const bizId = this.props.match.params.id;
        const {error, biz} = await Bizz.managerView(bizId, userId);
        if (error) {
            this.setState({error});
        } else {
            this.setState ({biz});
        }
    }

    async componentDidMount () {
        this._load();
    }

    async componentDidUpdate (oldProps: any) {
        if (this.props !== oldProps) {
            this._load();
        }
    }

    async onInviteTeamMember (name, email, role) {
        const userId = this.props.user.id;
        const bizId = this.props.match.params.id;
        await Bizz.inviteTeamMember(bizId, userId, name, email, role);
        this._load();
    }

    async onResend (token: string) {
        const userId = this.props.user.id;
        await Bizz.resendInvitation(token, userId);
        this._load();
    }

    async onRescind (token: string) {
        const userId = this.props.user.id;
        await Bizz.rescindInvitation(token, userId);
        this._load();
    }

    render () {
        const { user } = this.props;
        const { biz } = this.state;
        if (!biz) {
            return <DefaultLayout />;
        }

        const viewLink = '/bizz/' + biz.id + '/view';

        return (
            <DefaultLayout>
                <div className='biz manage'>
                    <div className='biz-name'>
                        <div>
                            <h1>
                                {biz.name} 
                            </h1>
                        </div>
                        <div className='actions'>
                            <Link to={viewLink}><Button variant='outline-primary'>Back</Button></Link>
                        </div>
                    </div>
                    <div className='contact-info'>
                        <span className='info'><i className="fas fa-map-marker-alt"></i><AddressView address={biz.address} /></span>
                        {
                            biz.phone?
                            <span><i className="fas fa-phone"></i><PhoneView phone={biz.phone} /></span>
                            : null
                        }
                    </div>
                    <div className='biz-tags'>
                        <span className="heading">Tags</span>
                        <TagsView tags={biz.tags} />
                    </div>

                    <Divider />

                    <PeopleInGroupView persons={biz.persons} onInvite={this.onInviteTeamMember.bind(this)} />
                    <Divider text='Pending Invitations' style={{marginTop: '20px', marginBottom: '20px'}} />
                    <PendingInvitations invitations={biz.invitations} onResend={this.onResend.bind(this)} onRescind={this.onRescind.bind(this)} />
                </div>
                            
            </DefaultLayout>

        )
    }
}

export default withAuth(ManageTeam);