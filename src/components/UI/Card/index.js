import React from 'react';

import './styles.scss';

const Card = (props) =>{
    const classes = 'card '+ props.className
    return <div className={classes} >{props.children}</div>
}
export default Card;