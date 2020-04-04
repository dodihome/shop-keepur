import React from 'react';
import { IBizLite } from '../../lib/business/business.interface';
import { CardGroup, Card, Button, Badge, CardDeck } from 'react-bootstrap';
import { PhoneView } from '../../components/widgets/Phone';
import { Link } from 'react-router-dom';
import { AddressView } from '../widgets/Address';
import { fromNow } from '../../utils/formatter';
import { TagsView } from '../widgets/TagsEdit';
import { InventoryView } from '../widgets/Inventory';

class BizCard extends React.Component<any, any> {

    onClick (e : any) {
        e.preventDefault();
        this.props.history.push('/bizz/' + this.props.biz.id);
    }

    render () {
        const {biz, user} = this.props;
        const showClaimButton = (user && !biz.isClaimed);
        const claimLink = '/bizz/claim/' + biz.id;

        const viewLink = '/bizz/' + biz.id;

        return <Card key={biz.id} className='biz-card'>
            <Card.Header>
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

                <Card.Text>
                    <div><i className="fas fa-map-marker-alt"></i><AddressView address={biz.address} /></div>
                {
                    biz.phone?
                    <div><i className="fas fa-phone"></i><PhoneView phone={biz.phone} /></div>
                    : null
                }
                </Card.Text>
                <TagsView tags={biz.tags} />

            </Card.Header>

            <Card.Body>
                <InventoryView items={biz.inventory} basic={true} />

            </Card.Body>

        </Card>
    }
}

export class BizzList extends React.Component<any, any> {
    render () {
        const { bizz } = this.props;
        return (
            <CardDeck>
            {
                bizz.map((biz: IBizLite) => {
                    return <BizCard key={biz.id} biz={biz} history={this.props.history} user={this.props.user} />
                })
            }
            </CardDeck>
        )
    }
}
