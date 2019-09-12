import React from 'react';
import BurgerIngridient from './BurgerIngredient/BurgerIngredient'
import  './Burger.css';


const Burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(k => {
            return [...Array(props.ingredients[k])].map((_, i) => {
                return <BurgerIngridient key={k + i} type={k}/>
            });
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients </p>
    }


    return (

        <div className='Burger'>
            <BurgerIngridient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngridient type="bread-bottom"/>
        </div>

    );
}


export default Burger;