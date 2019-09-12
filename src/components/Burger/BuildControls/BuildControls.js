import React from 'react';
import  './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const BuildControls = (props) => (

    <div className='BuildControls'>
        <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>

        {controls.map(ctrl => (
            <BuildControl
                key={ ctrl.label }
                label={ ctrl.label }
                type={ctrl.type}
                added={props.ingredientAdded}
                removed={ props.ingredientRemoved}
                disabled={props.disabled[ctrl.type]}
            />
        ))}

        <button className="OrderButton" disabled={!props.purchaseable} onClick={props.purchasing}>
            ORDER NOW
        </button>
    </div>
)


export default BuildControls;