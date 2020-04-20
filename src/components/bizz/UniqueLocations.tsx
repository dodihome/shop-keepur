import React from "react"
import * as _ from 'lodash';

import Bizz from "../../lib/business/client";
import { Button } from "react-bootstrap";
import './location.scss';
import { titleCase } from "title-case";

export class UniqueLocations extends React.Component <any, any> {
    state : any = {} as any;

    async componentDidMount () {
        const { error, cities } = await Bizz.getUniqueLocations();
        this.setState({error, cities});
    }

    onClick ( city: any, e: any) {
        e.preventDefault();
        city.location = city._id.city + ', ' + city._id.state;
        if (this.props.onClick)
            this.props.onClick(city);
    }

    render () {
        const { hideCount } = this.props;
        const { cities } = this.state;
        const grouped = _.groupBy (_.orderBy(cities, ['_id.state', '_.id.city'], ['asc', 'asc']) , '_id.state');

        return (
            <div className='browse-locations'>
                {
                    _.keys(grouped).map((st: any) => {

                        const vals = grouped[st];
                        return <div key={st} className='by-state'>
                            <div className='heading-state'>{st}</div>
                            {
                                _.orderBy(vals, ['_id.city'], ['asc']).map((city, idx) => {

                                    const linkText = hideCount? titleCase(city._id.city) : titleCase(city._id.city) + ' (' + city.count + ')';
                                return <span key={idx} className='by-city'>
                                            <Button variant='link' onClick={this.onClick.bind(this, city)}>
                                                {linkText}
                                            </Button>
                                    </span>
                                })
                            }
                        </div>
                    })
                }
            </div>
        )
    }
}