import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import {connect} from 'react-redux';


class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }


    componentDidMount(){
        this.props.onInitIngridients();
    }


    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(i => {
            return ingredients[i]
        }).reduce((sum, el) => {
                return sum + el;
            }
            , 0);
        return sum > 0;
    }


    updatePurchasingHandler = () => {
        this.setState({purchasing: true});
    }
    cancelPurchasingHandler = () => {
        this.setState({purchasing: false});
    }

    continuePurchasingHandler = () => {
        this.props.history.push('/checkout');
    }


    render() {
        const disbaledInfo = {...this.props.ings};


        for (let k in disbaledInfo) {
            disbaledInfo[k] = disbaledInfo[k] <= 0;
        }

        let OrderSummery = null;


        let burger = this.props.error ? 'error' : <Spinner/>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BurgerControls ingredientAdded={this.props.OnIngredientAdded}
                                    ingredientRemoved={this.props.OnIngredientRemoved}
                                    purchasing={this.updatePurchasingHandler}
                                    disabled={disbaledInfo}
                                    totalPrice={this.props.price}
                                    purchaseable={this.updatePurchaseState(this.props.ings)}/>
                </Aux>
            );

            OrderSummery = <OrderSummary ingridients={this.props.ings}
                                         totalPrice={this.props.price}
                                         purchaseCancelled={this.cancelPurchasingHandler}
                                         purchaseContinued={this.continuePurchasingHandler}/>;

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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingridients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
    };
}


const mapDispatchToProps = dispatch => {
    return {
        OnIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngridient(ingName)),
        OnIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngridient(ingName)),
        onInitIngridients: () => dispatch( burgerBuilderActions.initIngridients() ),
        onInitPurchase: () => dispatch( burgerBuilderActions.purchaseInit() )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));