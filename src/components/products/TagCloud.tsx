import * as _ from 'lodash';
import React from 'react';
import { Link } from "react-router-dom";

export const TagCloud = (props: any) => {
    const {products} = props;
    const counts = products.map((p)=> {
        return p.searchCount;
    })
    const min = _.min(counts) as number;
    const max = _.max(counts) as number;

    return (<div className='tag-cloud'>
        {
            products.map((p)=> {
                const fontSize = 1 + 0.3*(p.searchCount - min)*min/max;
                const fsStr = fontSize + 'em';
                const url = '/search?p=' + p.id;
                return <span key={p.id} style={{fontSize: fsStr}}>
                    <Link to={url}>{p.name}</Link>
                </span>
            })
        }
    </div>)
}

