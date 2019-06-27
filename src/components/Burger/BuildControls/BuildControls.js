import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = ( props ) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(el => (
            <BuildControl
                key={el.label}
                label={el.label}
                less={() => props.lessBtn(el.type)}
                more={() => props.moreBtn(el.type)}
                disabled={props.disabled[el.type]} />
        ))}
        <button
        className={classes.OrderButton}
        disabled={props.purchaseable}
        onClick={props.purchasing}>
            ORDER NOW
        </button>
    </div>
);

export default buildControls;