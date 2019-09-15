import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://burgerbuilder-4e71e.firebaseio.com/'
});

export default  instance;