import React, {Component} from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css'
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        emails: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ings,
            price: 222,
            customer: {
                name: 'Duha Hamdan',
                address: {
                    street: 'Test street',
                    zipCode: '123456',
                    country: 'Jordan'
                },
                email: 'test@hotmail.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => this.setState({loading: false}));
    }


    render() {
        let form = (  <form>
            <Input className="Input" elementType="input" type="text" name="name"     placeholder="Your Name"/>
            <Input className="Input" elementType="input" type="email" name="email"   placeholder="Your Email"/>
            <Input className="Input" elementType="input" type="text" name="street"   placeholder="Your Street"/>
            <Input className="Input" elementType="input" type="text" name="postcode" placeholder="Your Postcode"/>
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className="ContactData">
                <h4>Enter your contact date</h4>
                {form}

            </div>
        )
    }
}


export default ContactData;