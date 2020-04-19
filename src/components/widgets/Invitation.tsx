import React, { useState, useEffect } from 'react';
import { ButtonGroup, Button, Alert } from 'react-bootstrap';
import SignUp from '../accounts/SignUp';

import './Invitation.scss';

export const AcceptInvitation = (props) => {
    const { invitation, context, user, error, onAccept, onCancel } = props;

    const showSignUp = (!user && !context.isInviteeUser) ? true : false;
    const showSignIn = (!user && context.isInviteeUser) ? true: false;

    const onSignedUp = (token, user) => {
        console.log('userProfile', {token, user});
        onAccept (user.id);
    }

    const onCancelSignup = () => {
        onCancel(invitation.token);
    }

    return (
        <div className='invitation'>
            <div className='auth'>
                <span className='from'>{invitation.from.displayName} </span> 
                has invited you to join 
                <span className='context'> {context.name} ({context.type}).</span>
            </div>

            {
                error?
                <div className='auth'>
                    <Alert variant='danger'>{error}</Alert>
                </div> 
                : null
            }

            {
                showSignUp ?
                <React.Fragment>
                    <div className='auth'>
                        <strong>Sign Up</strong> to accept the invitation.
                    </div>

                    <SignUp invitation={invitation} onSuccess={onSignedUp} onCancel={onCancelSignup} hideLoginLink={true} />
                </React.Fragment>
                :

                <div className='auth'>
                    <ButtonGroup>
                        <Button variant='primary' onClick={()=> { onAccept(invitation.token) }}>Accept</Button>
                        <Button variant='link' onClick={() => { onCancel(invitation.token)  }}>Cancel</Button>
                    </ButtonGroup>
                </div>
            }
        </div>
    )        
}