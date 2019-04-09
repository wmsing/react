import React, {Component} from 'react';
import './purchase_add.css'
import Api from "../api/api";

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

class PurchaseAdd extends Component {
    constructor() {
        super()
        this.state = {
            createdAt: moment(new Date()).format('YYYY-MM-DD'),
            provider: '',
            product: '',
            quantity: '',
            price_purchase: '',
            remark: '',
            // open: false,
            // error: 'Error!!!',
            now: new Date()
        }
        this.onCreateAtChange = this.onCreateAtChange.bind(this);
    }


    onCreateAtChange = (date) => {
        console.log('onCreateAtChange: ' + moment(date).format('YYYY-MM-DD'))
        let formatedDate = moment(date).format('YYYY-MM-DD')

        this.setState({
            createdAt: formatedDate,
            now: date
        });
    }

    onProviderChange = (e) => {
        console.log('onProviderChange: ' + e.target.value)
        this.setState({
            provider: e.target.value
        });
    }

    onProductChange = (e) => {
        console.log('onProductChange: ' + e.target.value)
        this.setState({
            product: e.target.value
        });
    }

    onQuantityChange = (e) => {
        console.log('onQuantityChange: ' + e.target.value)
        this.setState({
            quantity: e.target.value
        });
    }

    onPriceChange = (e) => {
        console.log('onPriceChange: ' + e.target.value)
        this.setState({
            price_purchase: e.target.value
        });
    }

    onRemarkChange = (e) => {
        console.log('onRemarkChange: ' + e.target.value)
        this.setState({
            remark: e.target.value
        });
    }

    // handleClickOpen = (error) => {
    //     ErrorDialog.setState({
    //         error: error,
    //         open: true
    //     })
    // };

    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        if (!this.state.provider) {
            console.log('provider empty')
            alert('供应商必填')
            return
        }
        if (!this.state.product) {
            console.log('product empty')
            alert('商品名必填')
            return
        }
        if (!this.state.quantity) {
            console.log('quantity empty')
            alert('数量必填')
            return
        }
        if (!this.state.price_purchase) {
            console.log('price_purchase empty')
            alert('价格必填')
            return
        }
        Api.post('purchase', {
            products: {
                name: this.state.product,
                quantity: this.state.quantity,
                price_purchase: this.state.price_purchase,
                provider: {
                    name: this.state.provider
                },
                remark: this.state.remark,
                purchaseDate: this.state.createdAt
            }
        }).then(res => {
            console.log(res)
            window.location.reload()
            //purchase.js refresh data
        }).catch(error => {
            console.log('e: ' + error)
            alert(error)
        })
    }

    render() {
        return (
            <div>
                {/*<ErrorDialog open={this.state.open} error={this.state.error}/>*/}
                <h3>添加采购记录</h3>
                <form onSubmit={this.onSubmit} className={'form_add'}>
                    <DatePicker
                        selected={this.state.now}
                        onChange={this.onCreateAtChange}
                        dateFormat="yyyy-MM-dd"
                        isClearable={true}
                        className={'datePicker add_item'}
                        name="createdAt"
                        margin="small"

                    />
                    <TextField
                        id="filled-required"
                        type="text"
                        name="provider"
                        placeholder="供应商"
                        value={this.state.provider}
                        onChange={this.onProviderChange}
                        className={'add_item'}
                    />
                    <TextField
                        id="filled-required"
                        type="text"
                        name="product"
                        placeholder="商品名"
                        value={this.state.product}
                        onChange={this.onProductChange}
                        className={'add_item'}
                    />
                    <TextField
                        id="filled-required"
                        type="number"
                        name="quantity"
                        placeholder="数量"
                        value={this.state.quantity}
                        onChange={this.onQuantityChange}
                        className={'add_item_small'}
                    />
                    <TextField
                        id="filled-required"
                        type="number"
                        name="price_purchase"
                        placeholder="单价"
                        value={this.state.price_purchase}
                        onChange={this.onPriceChange}
                        className={'add_item_small'}
                    />
                    <TextField
                        id="filled-name"
                        type="text"
                        name="remark"
                        placeholder="Remark"
                        value={this.state.remark}
                        onChange={this.onRemarkChange}
                        className={'add_item'}
                    />

                    <Fab size="medium" color="primary" aria-label="Add" type="submit" name="submit">
                        +
                    </Fab>
                    {/*<input*/}
                    {/*type="submit"*/}
                    {/*name="submit"*/}
                    {/*value="增加"*/}
                    {/*className="btn"*/}
                    {/*/>*/}
                </form>
            </div>

        )
    }
}

export default PurchaseAdd;
