import React from "react";
import * as _ from 'lodash';

import Products from "../../lib/product/client";
import { titleCase } from "title-case";
import { Link } from "react-router-dom";

export class ProductList extends React.Component<any, any> {
    render () {
        const sorted = _.orderBy(this.props.products, 'searchCount');
        return (
            <div className='product-list'>
                {
                    sorted.map((p)=>{
                        if (p) {
                            const url = '/search?p=' + p.id;
                            return <span key={p.id} className='item'>
                                <Link to={url}>{titleCase(p.name)}</Link>
                            </span>    
                        } else {
                            return null;
                        }
                    })
                }
            </div>
        )
    }
}