import React from 'react';
import   './NavigationItem.css';


const navigationItem = (props) => (
    <li className='NavigationItem'
        exact={ props.exact }
        to={ props.link }>
        <a href={ props.link}
           className={props.active ? 'active' : null}>
            { props.children }</a></li>
);

export default navigationItem;