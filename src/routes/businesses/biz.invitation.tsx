import React from 'react';
import Bizz from '../../lib/business/client';
import DefaultLayout from '../../components/layout/default';
import { AcceptInvitation } from '../../components/widgets/Invitation';
import { withAuth } from '../../utils/withAuth';

class BizInvitation extends React.Component<any, any> {
    state : any = {} as any;

    async fetchInvitation () {
        const token = this.props.match.params.token;
        const {error, invitation, context} = await Bizz.getInvitationByToken(token);
        this.setState({
            error, invitation, context
        });
    }

    componentDidMount () {
        this.fetchInvitation();
    }

    componentDidUpdate (oldProps) {
        if ( this.props !== oldProps ) {
            this.fetchInvitation();
        }
    }

    async onAccept (userId: string) {
        const token = this.props.match.params.token;
        const {context} = this.state;
        const {error} = await Bizz.acceptInvitation(token, userId);
        if (!error) {
            this.props.history.push('/bizz/' + context.id + '/view');
        } else {
            this.setState ({error});
        }
    }

    onCancel () {
        this.props.history.push('/');
    }

    render () {
        const { user } = this.props;
        const { invitation, context, error } = this.state;
        if (!invitation || !context) 
            return null;

        return (
            <DefaultLayout>
                <AcceptInvitation user={user} invitation={invitation} context={context} error={error}
                    onAccept={this.onAccept.bind(this)} onCancel={this.onCancel.bind(this)} />
            </DefaultLayout>
        )
    }
}

export default withAuth(BizInvitation);