import {StockDto} from '../dto/stock.dto';
import axios from 'axios';
import {ProductOrder} from '../dto/product.order';

export function getStock(){
    return axios
        .get('http://localhost:8080/api/stock')
        .then(response => {
            // Process the response data
            return response.data;
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });
}

export function createOrder(products) {
    return axios
        .post('http://localhost:8080/api/order', {
            status: 'NOT_STARTED',
            totalAmount: 1,
            address: 'Pilar',
            products: products,
        })
        .then(response => {})
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });
}
