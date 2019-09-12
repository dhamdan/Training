import React from 'react';
import  './BuildControl.css';


const BuildControl = (props) => (
    <div className="BuildControl">
        <div className="Label">{props.label}</div>
        <button className="Less" onClick={()=>props.removed(props.type)} disabled={props.disabled}>Less</button>
        <button className="More" onClick={()=>props.added(props.type)}>More</button>
    </div>

)


export default BuildControl;