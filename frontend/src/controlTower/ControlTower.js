import axios from 'axios';

export function getStock(){
    return axios
        .get('http://localhost:8080/api/stock')
        .then(response => {
            // Process the response data
            if(response.status !== 200) {
                throw new Error('Failed to fetch products in control tower');
            }
            return response.data;
        })
        .catch(error => {
            console.error('Error listing products:', error);
            throw error;
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
