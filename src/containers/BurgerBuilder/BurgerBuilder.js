import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }


    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(i => {
            return ingredients[i]
        }).reduce((sum, el) => {
                return sum + el;
            }
            , 0);
        this.setState({purchaseable: sum > 0});
    }


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = oldCount + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            return;
        }
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = oldCount - 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    };


    updatePurchasingHandler = () => {
        this.setState({purchasing: true});
    }
    cancelPurchasingHandler = () => {
        this.setState({purchasing: false});
    }

    continuePurchasingHandler = () => {
        alert('tttt')
    }


    render() {
        const disbaledInfo = {...this.state.ingredients};

        for (let k in disbaledInfo) {
            disbaledInfo[k] = disbaledInfo[k] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchasingHandler}>
                    <OrderSummary ingridients={this.state.ingredients}
                                  totalPrice={this.state.totalPrice}
                                  purchaseCancelled={this.cancelPurchasingHandler}
                                  purchaseContinued={this.continuePurchasingHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls ingredientAdded={this.addIngredientHandler}
                                ingredientRemoved={this.removeIngredientHandler}
                                purchasing={this.updatePurchasingHandler}
                                disabled={disbaledInfo}
                                totalPrice={this.state.totalPrice}
                                purchaseable={this.state.purchaseable}
                />

            </Aux>
        );
    }
}


export default BurgerBuilder;