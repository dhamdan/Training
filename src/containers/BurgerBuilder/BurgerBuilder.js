import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false

    }


    componentDidMount() {
        axios.get('https://burgerbuilder-4e71e.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data});
            })
            .catch(error => this.setState({error: true}));
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
        const queryParam = [];
        for (let i in this, this.state.ingredients) {
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        const queryString = queryParam.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }


    render() {
        const disbaledInfo = {...this.state.ingredients};

        for (let k in disbaledInfo) {
            disbaledInfo[k] = disbaledInfo[k] <= 0;
        }

        let OrderSummery = null;


        let burger = this.state.error ? 'error' : <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BurgerControls ingredientAdded={this.addIngredientHandler}
                                    ingredientRemoved={this.removeIngredientHandler}
                                    purchasing={this.updatePurchasingHandler}
                                    disabled={disbaledInfo}
                                    totalPrice={this.state.totalPrice}
                                    purchaseable={this.state.purchaseable}/>
                </Aux>
            );

            OrderSummery = <OrderSummary ingridients={this.state.ingredients}
                                         totalPrice={this.state.totalPrice}
                                         purchaseCancelled={this.cancelPurchasingHandler}
                                         purchaseContinued={this.continuePurchasingHandler}/>;

        }

        if (this.state.loading) {
            OrderSummery = <Spinner/>;
        }

        return (

            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchasingHandler}>
                    {OrderSummery}
                </Modal>
                {burger}

            </Aux>
        );
    }
}


export default withErrorHandler(BurgerBuilder, axios);