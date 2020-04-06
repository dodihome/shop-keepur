import React from 'react';
import queryString from 'query-string';

import DefaultLayout from '../components/layout/default';

import './homepage.scss';
import { ProductSearch } from '../components/products/ProductSearch';

import Products from '../lib/product/client';
import Bizz from '../lib/business/client';
import { BizzList } from '../components/bizz/BizzList';
import { Divider } from '../components/widgets/Divider';
import Dodi from '../utils/Dodi';
import { NameValuePairView } from '../components/widgets/NameValuePair';
import { withLocation } from '../utils/withLocation';
import { UserLocationView, Message_LoginToAddStore, Message_AddStore } from '../components/widgets';
import { withAuth } from '../utils/withAuth';

class SearchPage extends React.Component <any, any> {
    state : any = { bizz : [] } as any;

    async componentDidMount () {
        const {p} = queryString.parse(this.props.location.search);
        const {error, bizz, matchCount} = await Bizz.searchByProduct (p);
        this.setState({error, bizz, matchCount});
    }

    async onSearch (product: any) {
        const {error, bizz, matchCount} = await Bizz.searchByProduct (product.id);
        this.setState({error, bizz, matchCount});
    }

    async onAddProduct (newProduct: any) {
        const {error, product} = await Products.add(newProduct.name);
        this.onSearch (product);
    }

    render () {
        const { user, history } = this.props;
        const userLocation = Dodi.location();

        let messageBlock = null;
        if (this.state.matchCount === 0 && user)
            messageBlock = <Message_AddStore />;
        else
            messageBlock = <Message_LoginToAddStore />;

        return (
            <DefaultLayout>
                <div className='home'>
                    <ProductSearch onSearch={this.onSearch.bind(this)} onAdd={this.onAddProduct.bind(this)} />
                    <UserLocationView />

                    <div className='search-result biz list'>
                        <div className='result-count'>
                            <NameValuePairView name='Search Result' value={this.state.matchCount} />
                        </div>

                        {messageBlock}
                        
                        {
                            this.state.matchCount ?
                            null
                            :
                            <Divider text={`Stores in ${userLocation}`} />
                        }
                        <BizzList bizz={this.state.bizz} user={user} history={history} />
                    </div>
                </div>
            </DefaultLayout>
        )
    }
}

export default withLocation(withAuth(SearchPage));