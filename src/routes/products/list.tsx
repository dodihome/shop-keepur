import * as _ from 'lodash';

import Products from "../../lib/product/client";
import DefaultLayout from "../../components/layout/default";
import React from "react";

import './product.scss';
import { TagCloud } from '../../components/products/TagCloud';
import { ProductSearch } from '../../components/products/ProductSearch';
import { withLocation } from '../../utils/withLocation';
import { UserLocationView } from '../homepage';

class ProductsPage extends React.Component<any, any> {
    state : any = {} as any;

    async componentDidMount () {
        const {error, products} = await Products.list();
        this.setState({error, products});
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
        const { products } = this.state;
        return (
            <DefaultLayout>
                <div className='product list'>
                    <h1>Products</h1>
                    
                    <ProductSearch onSearch={this.onSearch.bind(this)} onAdd={this.onAddProduct.bind(this)} />
                    <UserLocationView />
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

export default withLocation(ProductsPage);