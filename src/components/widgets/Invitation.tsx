import React from 'react';
import { ButtonGroup, Button, Alert } from 'react-bootstrap';
import SignUp from '../accounts/SignUp';

import './Invitation.scss';
import Login from '../accounts/Login';

export const AcceptInvitation = (props) => {
    const { invitation, context, user, error, onAccept, onCancel } = props;

    const showSignUp = (!user && !context.isInviteeUser) ? true : false;
    const showSignIn = (!user && context.isInviteeUser) ? true: false;

    const onSuccess = (user) => {
        onAccept (user.id);
    }

    const onCancelLogin = () => {
        onCancel();
    }

    const toEmail = invitation? invitation.to.email : '';
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
                user?
                <div className='auth'>
                    <ButtonGroup>
                        <Button variant='primary' onClick={()=> { onAccept(user.id) }}>Accept</Button>
                        <Button variant='link' onClick={() => { onCancel()  }}>Cancel</Button>
                    </ButtonGroup>
                </div>
                : null
            }

            {
                showSignUp ?
                <React.Fragment>
                    <div className='auth'>
                        <strong>Sign Up</strong> to accept the invitation.
                    </div>

                    <SignUp invitation={invitation} onSuccess={onSuccess} onCancel={onCancelLogin} hideLoginLink={true} />
                </React.Fragment>
                : null
            }

            {
                showSignIn ?
                <React.Fragment>
                    <div className='auth'>
                        <strong>Login</strong> to accept the invitation.
                    </div>

                    <Login email={toEmail} onSuccess={onSuccess} onCancel={onCancelLogin} hideSignupLink={true} />
                </React.Fragment>
                : null
            }
        </div>
    )        
}