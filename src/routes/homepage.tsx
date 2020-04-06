import React from 'react';

import DefaultLayout from '../components/layout/default';
import { UserLocation } from '../components/widgets/UserLocation';

import './homepage.scss';
import { Alert, Button } from 'react-bootstrap';
import { withLocation } from '../utils/withLocation';
import { ProductSearch } from '../components/products/ProductSearch';

import Products from '../lib/product/client';
import { withAuth } from '../utils/withAuth';
import { TagCloud } from '../components/products/TagCloud';
import { UserLocationView } from '../components/widgets';
import Bizz from '../lib/business/client';
import { BizzList } from '../components/bizz/BizzList';
import { Divider } from '../components/widgets/Divider';

export const SetUserLocation = (props: any)=>{
    return (
        <DefaultLayout>
            <div className='home'>
                <div className='set-location'>
                    <strong>Please set your search location:</strong>
                    <UserLocation history={props.history} />
                    <Alert variant='info'>
                        <p><i><strong>Why?</strong></i> We are looking for products in <strong>local stores</strong>.</p>
                        <p><i><strong>Why isn't this automatic?</strong></i> Because it is very annoying to have your browser popup a warning asking 'this site is trying access your location data, is it OK?'</p>
                        <p><i><strong>Where is the location information stored?</strong></i> It is set as a cookie in your browser.  It is <strong>NOT stored in our database</strong>.</p>
                    </Alert>
                </div>
            </div>
        </DefaultLayout>
    )
}

class HomePage extends React.Component <any, any> {
    state : any = { products : [] as any, bizz : [] } as any;

    async componentDidMount () {
        const {error, products} = await Products.list();
        const {bizz} = await Bizz.latestUpdates();
        this.setState({error, products, bizz});
    }

    async onSearch (product: any) {
        const url = '/search?p=' + product.id;
        this.props.history.push(url);
    }

    async onAddProduct (newProduct: any) {
        const {error, product} = await Products.add(newProduct.name);
        this.onSearch (product);
    }

    render () {
        const headline = <span>Find toilet paper and more...</span>
        return (
            <DefaultLayout 
                headline={headline}>
                <div className='home'>
                    <div className='products'>
                        <ProductSearch onSearch={this.onSearch.bind(this)} onAdd={this.onAddProduct.bind(this)} />
                        <UserLocationView />
                        <TagCloud products={this.state.products} />
                    </div>
                    <Divider />
                    <div className='biz list'>
                        <h1>Updates</h1>
                        <BizzList bizz={this.state.bizz} />
                    </div>
                </div>
            </DefaultLayout>
        )
    }
}

export default withLocation(withAuth(HomePage));