import * as _ from 'lodash';

import Products from "../../lib/product/client";
import DefaultLayout from "../../components/layout/default";
import React from "react";

import './product.scss';
import { TagCloud } from '../../components/products/TagCloud';

export class ProductsPage extends React.Component<any, any> {
    state : any = {} as any;

    async componentDidMount () {
        const {error, products} = await Products.list();
        this.setState({error, products});
    }

    render () {
        const { products } = this.state;
        return (
            <DefaultLayout>
                <div className='product list'>
                    <h1>Products</h1>
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