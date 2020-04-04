import React from 'react';
import queryString from 'query-string';

import DefaultLayout from '../components/layout/default';

import './homepage.scss';
import { withLocation } from '../utils/withLocation';
import { ProductSearch } from '../components/products/ProductSearch';

import Products from '../lib/product/client';
import Bizz from '../lib/business/client';
import { BizzList } from '../components/bizz/BizzList';
import { withAuth } from '../utils/withAuth';

class SearchPage extends React.Component <any, any> {
    state : any = { bizz : [] } as any;

    async componentDidMount () {
        const {p} = queryString.parse(this.props.location.search);
        const {error, bizz} = await Bizz.searchByProduct (p);

        console.log('search result', bizz);
        this.setState({error, bizz});
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
            <DefaultLayout>
                <div className='home'>
                    <ProductSearch onSearch={this.onSearch.bind(this)} onAdd={this.onAddProduct.bind(this)} />
                    <div className='search-result biz list'>
                        <BizzList bizz={this.state.bizz} user={user} history={history} />
                    </div>
                </div>
            </DefaultLayout>
        )
    }
}

export default SearchPage;