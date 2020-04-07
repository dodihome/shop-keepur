import React from 'react';
import { IBizLite } from '../../lib/business/business.interface';
import { Card, Button, Badge, CardDeck } from 'react-bootstrap';
import { PhoneView } from '../../components/widgets/Phone';
import { Link } from 'react-router-dom';
import { AddressView } from '../widgets/Address';
import { fromNow } from '../../utils/formatter';
import { TagsView } from '../widgets/TagsEdit';
import { InventoryView, InventoryEdit } from '../widgets/Inventory';

class BizCard extends React.Component<any, any> {

    onClick (e : any) {
        e.preventDefault();
        this.props.history.push('/bizz/' + this.props.biz.id + '/view');
    }

    render () {
        const {biz, user} = this.props;
        const showClaimButton = (user && !biz.isClaimed);
        const claimLink = '/bizz/' + biz.id + '/claim';

        const viewLink = '/bizz/' + biz.id + '/view';

        return <div key={biz.id} className='biz-card'>
            <div className='heading'>
                <span className='title'><Link to={viewLink}>{biz.name}</Link></span> 
                {
                    showClaimButton? 
                    <Link to={claimLink}><Button size="sm" variant='link'>(Claim Business)</Button></Link>
                    : null
                }
                {
                    biz.isClaimed ?
                    <Badge variant='primary'>Claimed</Badge> : null
                }
                <div className='meta'>
                    Last Update: <strong>{fromNow(biz.meta.lastModifiedAt)}</strong>, by <strong>{biz.meta.lastModifiedBy.displayName}</strong>
                </div>
                <div className='contact-info'>
                    <div><i className="fas fa-map-marker-alt"></i><AddressView address={biz.address} /></div>
                {
                    biz.phone?
                    <div><i className="fas fa-phone"></i><PhoneView phone={biz.phone} /></div>
                    : null
                }
                </div>
            </div>

            <div className='biz-body'>
                <InventoryView items={biz.inventory} basic={true} />
            </div>

        </div>
    }
}

export class BizzList extends React.Component<any, any> {
    render () {
        const { bizz } = this.props;
        return (
            <div className='search-result'>
            {
                bizz.map((biz: IBizLite) => {
                    return <BizCard key={biz.id} biz={biz} history={this.props.history} user={this.props.user} />
                })
            }
            </div>
        )
    }
}
