import Dodi from "../../utils/Dodi";
import React from "react";
import { NameValuePairView } from "./NameValuePair";
import { Link } from "react-router-dom";
import { Button, Alert, OverlayTrigger, Popover, PopoverContent, PopoverTitle } from "react-bootstrap";
import { UniqueLocations } from "../bizz/UniqueLocations";
import { UserLocation } from "./UserLocation";
import { Divider } from "./Divider";

import './index.scss';

export const UserLocationView = (props: any) => {
    const userLocation = Dodi.location();
    return (
        <div className='user-location'>
            <NameValuePairView name='Location' value={userLocation} />
            <ChangeLocationPopover />
        </div>
    )
}

export const Message_LoginToAddStore = (props: any) => {
    const cookieName = 'promptedLoginToAddStore';
    const showAgain = Dodi.checkTimestamp(cookieName);
    if (!showAgain) return null;

    Dodi.setTimestamp(cookieName, 10);

    return (
        <Alert variant='info'>
            <p><strong>Login</strong> to add a store, and/or edit a store's product info.</p>
            <p><strong>Why require login?</strong> Think about those who have limited time to shop and count on your information to get it done.  
                A little accountability goes a long way.</p>
            <hr/>
            <div className='d-flex justify-content-end'>
                <Link to='/user/login'><Button variant='outline-primary'>Login</Button></Link>
            </div>
        </Alert>
    )    
}

export const Message_AddStore = (props: any) => {
    const cookieName = 'promptedAddStore';
    const showAgain = Dodi.checkTimestamp(cookieName);
    if (!showAgain) return null;

    Dodi.setTimestamp(cookieName, 10);

    return (
        <Alert variant='info'>
            <Alert.Heading>Dont' see what you are looking for?</Alert.Heading>
            <p>Information is out there.  Help others by contributing data.</p>
            <hr/>
            <div className='d-flex justify-content-end'>
                <Link to='/bizz/new'><Button variant='outline-primary'>Add a Store</Button></Link>
            </div>
        </Alert>
    )
}

export const Message_LoginToEdtiInventory = (props: any) => {
    const cookieName = 'promptedLoginToEdit';
    const showAgain = Dodi.checkTimestamp(cookieName);
    if (!showAgain) return null;

    Dodi.setTimestamp(cookieName, 10);

    return (
        <Alert variant='info'>
            <p><strong>Login</strong> to update store info.</p>
            <p><strong>Why require login?</strong> Think about those who have limited time to shop and count on your information to get it done.  
                A little accountability goes a long way.</p>
            <hr/>
            <div className='d-flex justify-content-end'>
                <Link to='/user/login'><Button variant='outline-primary'>Login</Button></Link>
            </div>
        </Alert>
    )
}

function clickToChangeLocation (city : any) {
    Dodi.getInstance().setLocation(city.location);
    window.location.reload(false);
}

export const ChangeLocationPopover = (props)=> {
    return (
        <OverlayTrigger trigger='click' key='bottom' placement='bottom' overlay={
            <Popover id='popover-locations'>
                <PopoverTitle>
                    <h3>Location</h3>
                    <UserLocation hideLabel={true} isPopover={true} />
                </PopoverTitle>
                <PopoverContent>
                    <Divider text='OR' />
                    <UniqueLocations hideCount={true} onClick={clickToChangeLocation} />
                </PopoverContent>
            </Popover>
        }>
            <Button variant='link'>(Change Location) <i className='fa fa-caret-down' /></Button>
        </OverlayTrigger>
    )
}
