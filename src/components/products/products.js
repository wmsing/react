import React, {Component} from 'react';
import './products.css';

// import Button from '@material-ui/core/Button';


class Products extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.fetchCustomer()

    }

    fetchCustomer() {
        fetch('http://localhost:3004/products')
            .then(res => res.json())
            .then(data =>{
                console.log(data.products)
                this.setState({
                    products : data.products
                })
            })
    }

    render() {
        return (
            <div className="App">
                <h2>Customers.. </h2>
                <ul>
                    {this.state.products.map(product =>
                        <li key={product.id}>{product.name}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Products;
