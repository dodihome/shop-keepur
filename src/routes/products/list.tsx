import * as _ from 'lodash';

import Products from "../../lib/product/client";
import DefaultLayout from "../../components/layout/default";
import React from "react";

import './product.scss';
import { TagCloud } from '../../components/products/TagCloud';
import { ProductSearch } from '../../components/products/ProductSearch';
import Bizz from '../../lib/business/client';

export class ProductsPage extends React.Component<any, any> {
    state : any = {} as any;

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
        const { products } = this.state;
        return (
            <DefaultLayout>
                <div className='product list'>
                    <h1>Products</h1>
                    
                    <ProductSearch onSearch={this.onSearch.bind(this)} onAdd={this.onAddProduct.bind(this)} />
                    {
                        products?                     
                        <TagCloud products={products} />
                        : null
                    }
                </div>
            </DefaultLayout>
        )
    }
}