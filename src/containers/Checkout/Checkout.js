import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom';
import ContactDate from './ContactData/ContactData';


class Checkout extends Component {

    state = {
        ings:null
    }

    componentWillMount() {

        const query = new URLSearchParams(this.props.location.search);
        const ings = {};
        for (let param  of query.entries()) {
            ings[param[0]] = +param[1];
        }

        this.setState({ings})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return ( <div>
            <CheckoutSummary
                ingridients={ this.state.ings }
                checkoutCancelled={ this.checkoutCancelledHandler }
                checkoutContinued={ this.checkoutContinuedHandler }
            />
            <Route path={this.props.match.path + '/contact-data'} render={(props)=>(<ContactDate ings={this.state.ings} {...props}/>)}/>
        </div>)
    }

}


export default Checkout;