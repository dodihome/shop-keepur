import React from 'react';
import Bizz from '../../lib/business/client';
import DefaultLayout from '../../components/layout/default';
import { withAuth } from '../../utils/withAuth';
import { BizzList } from '../../components/bizz/BizzList';

class ConsumerList extends React.Component<any, any> {
    state : any = {bizz: []} as any;

    async componentDidMount () {
        const {error, bizz} = await Bizz.list();

        if (error) {
            this.setState({error});
        } else {
            console.log({bizz});
            this.setState ({
                bizz
            });    
        }
    }

    render () {
        const { user, history } = this.props;
        return (
            <DefaultLayout>
                <BizzList bizz={this.state.bizz} user={user} history={history} />
            </DefaultLayout>
        )
    }
}

export default withAuth(ConsumerList);