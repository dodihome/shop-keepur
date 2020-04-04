import React from 'react';

import DefaultLayout from '../components/layout/default';
import { UserLocation } from '../components/widgets/UserLocation';

import './homepage.scss';
import { Alert } from 'react-bootstrap';
import { withLocation } from '../utils/withLocation';
import { ProductSearch } from '../components/products/ProductSearch';

import { isMobile } from 'react-device-detect';
import Products from '../lib/product/client';
import { ProductList } from '../components/products/ProductList';
import Bizz from '../lib/business/client';
import { BizzList } from '../components/bizz/BizzList';
import { withAuth } from '../utils/withAuth';

const SetUserLocation = (props: any)=>{
    return (
        <div className='set-location'>
            <strong>Please set your search location:</strong>
            <UserLocation />
            <Alert variant='info'>
                <p><i><strong>Why?</strong></i> We are looking for products in <strong>local stores</strong>.</p>
                <p><i><strong>Why isn't this automatic?</strong></i> Because it is very annoying to have your browser popup a warning asking 'this site is trying access your location data, is it OK?'</p>
                <p><i><strong>Where is the location information stored?</strong></i> It is set as a cookie in your browser.  It is <strong>NOT stored in our database</strong>.</p>
            </Alert>
        </div>
    )
}

class HomePage extends React.Component <any, any> {
    state : any = { products : [] as any, bizz : [] } as any;

    async componentDidMount () {
        const {error, products} = await Products.list();
        this.setState({error, products});
    }

    async onSearch (productId: string) {
        const {error, bizz} = await Bizz.searchByProduct (productId);

        console.log('search result', bizz);
        this.setState({error, bizz});
    }

    async onAddProduct (productName: string) {
        const {error, product} = await Products.add(productName);
        this.onSearch (product.id);
    }

    render () {
        const { user, userLocation, history } = this.props;
        return (
            <DefaultLayout homepage={true}>
                <div className='home'>
                {
                    userLocation? null : <SetUserLocation />
                }
                    <ProductSearch onSearch={this.onSearch.bind(this)} onAdd={this.onAddProduct.bind(this)} />
                    <div className='search-result biz list'>
                        <BizzList bizz={this.state.bizz} user={user} history={history} />
                    </div>
                </div>
            </DefaultLayout>
        )
    }
}

export default withAuth(withLocation(HomePage));