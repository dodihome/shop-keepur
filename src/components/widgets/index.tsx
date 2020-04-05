import Dodi from "../../utils/Dodi";
import React from "react";
import { NameValuePairView } from "./NameValuePair";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

export const UserLocationView = (props: any) => {
    const userLocation = Dodi.location();
    return (
        <div className='user-location'>
            <NameValuePairView name='Location' value={userLocation} />
            <Link to='/set-location'><Button variant='link'>(Change Location)</Button></Link>
        </div>
    )
}

export const Message_LoginToAddStore = (props: any) => {
    const showAgain = Dodi.showLoginPromptAgain();
    if (!showAgain)
        return null;
        
    Dodi.getInstance().setLoginPromptTS();
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
    const showAgain = Dodi.showLoginPromptAgain();
    if (!showAgain) return null;

    Dodi.getInstance().setLoginPromptTS();

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
    const showAgain = Dodi.showLoginPromptAgain();
    if (!showAgain) return null;

    Dodi.getInstance().setLoginPromptTS();

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