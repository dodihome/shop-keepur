import React from 'react';

export const Divider = (props : any) => {
    const style = props.style? props.style: {};
    let className = props.className? props.className : '';

    if (props.hidden) {
        style.height = '20px';
        return <div className={className} style={style} />;
    } else if (props.text) {
        className = className + ' divider';
        return (
            <div className={className} style={style}>
                <hr />
                <span>{props.text}</span>
                <hr />
            </div>
            )        
    } else {
        return <hr className={className} style={style} />
    }
}