import React from 'react';

export const Divider = (props) => {
    if (props.text) {
        return (
            <div className='divider'>
                <hr />
                <span>{props.text}</span>
                <hr />
            </div>
            )        
    } else {
        return <hr />
    }
}