import React from 'react';

import DefaultLayout from '../components/layout/default';
import { UserLocation } from '../components/widgets/UserLocation';

import './homepage.scss';
import { Alert } from 'react-bootstrap';
import { withLocation } from '../utils/withLocation';

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
    render () {
        const { userLocation } = this.props;
        return (
            <DefaultLayout homepage={true}>
                <div className='home'>
                {
                    userLocation? null : <SetUserLocation />
                }
                    
                </div>
            </DefaultLayout>
        )
    }
}

export default withLocation(HomePage);