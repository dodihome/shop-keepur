import React from 'react';

export const Divider = (props : any) => {
    if (props.hidden) {
        return <div style={{height: '20px'}} />;
    } else if (props.text) {
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