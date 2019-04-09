import React, {Component} from 'react';

import './App.css';

import Purchase from "./components/purchases/purchase";
import Header from "./components/layout/Header";
import PurchaseAdd from "./components/purchases/purchase_add";
import Api from "./components/api/api";
import moment from "moment";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchase: [],
            isLoading: false,
            filterPurchase: []
        }
        this.onRowUpdate = this.onRowUpdate.bind(this); // 自己都要update

    }

    componentDidMount() {
        this.getPurchase();
    }

    /// List
    getPurchase() {
        Api.get('purchase')
            .then(data => {
                const filterPurchase = data.data.purchases.map((purchase, index) => {
                    return {
                        id: purchase.id,
                        index: index + 1,
                        createdAt: moment(new Date()).format('YYYY-MM-DD'),
                        purchaseDate: moment(purchase.purchaseDate).format('YYYY-MM-DD'),
                        provider: purchase.product.provider.name,
                        product: purchase.product.name,
                        quantity: purchase.product.quantity,
                        price_purchase: purchase.product.price_purchase,
                        totalPrice: purchase.product.price_purchase * purchase.product.quantity,
                        currentQuantity: purchase.currentQuantity,
                        marketPrice: purchase.marketPrice,
                        remark: purchase.remark,
                        delete: 'Delete'
                    }
                });
                this.setState({
                    purchase: filterPurchase,
                    filterPurchase: filterPurchase,
                    isLoading: false
                })

            })
            .catch(error => {
                alert(error)
                console.log('e: ' + error)
            })
    }

    // Update
    onRowUpdate(fromRow, toRow, updated) {
        console.log("update from child")
        console.log(updated)

        const rows = this.state.purchase;
        let requestBody = {}

        for (let i = fromRow; i <= toRow; i++) {
            const updatedRow = {...rows[i], ...updated}
            console.log(updatedRow)
            requestBody = {
                products: updatedRow
            }
            Api.patch('purchase/' + updatedRow.id, requestBody).then((res) => {
                console.log(res)
                // update child - 1) update row

                let updatedPurchase = [...this.state.filterPurchase]
                updatedPurchase[fromRow] = updatedRow
                this.setState({
                    filterPurchase: updatedPurchase
                })

            }).catch(error => {
                console.log(error)
                alert(error)
            })
        }

    }

    render() {
        return (
            <div className="App">
                <Header/>
                <PurchaseAdd/>

                {/*onRowUpdate is provided for child to update something*/}
                <Purchase purchase={this.state.filterPurchase}
                          isLoading={this.state.isLoading}
                          onRowUpdate={this.onRowUpdate} />
            </div>
        )
    }


}

export default App;
