import React, {Component} from 'react';
import './purchase.css'
import ReactDataGrid from 'react-data-grid';
import {Toolbar} from 'react-data-grid-addons'

import Api from "../api/api";


class Purchase extends Component {

    /// Lifecycle
    // Begin...
    componentWillMount() {
        console.log("componentWillMount...") //1
    }

    componentDidMount() {
        console.log("componentDidMount...") //2
    }

    // If update happen..
    componentWillReceiveProps(nextProps, nextContext) {
        console.log("componentWillReceiveProps...") //3
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log("componentWillUpdate...") //4
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate...") //5
    }
    // Update end.
    // End.

    // Update -> notify parent
    onGridRowsUpdated = ({fromRow, toRow, updated}) => {
        //如果没有变 return
        let updatedPurchase = [...this.props.purchase]
        if (updatedPurchase[fromRow].provider === updated.provider){
            return
        }

        this.props.onRowUpdate(fromRow, toRow, updated)
    };

    // Update
    handleFilterChange = (filter) => {
        console.log('filterTerm: ' + filter.filterTerm)
        console.log('filter key: ' + filter.column.key)
        let filterPurchase = this.state.purchase
        if (!filter.filterTerm) {
            this.setState({
                filterPurchase: this.state.purchase
            })
            return
        }

        filterPurchase = filterPurchase.filter((purchase) => {
            //1 product
            if (filter.column.key === 'provider') {
                let providerName = purchase.provider.toString().toLowerCase()
                return providerName.indexOf(
                    filter.filterTerm.toString().toLowerCase()) !== -1
            }
            //2 provider
            if (filter.column.key === 'product') {
                let productName = purchase.product.toString().toLowerCase()
                console.log('productName: ' + productName)

                return productName.indexOf(
                    filter.filterTerm.toString().toLowerCase()) !== -1
            }
        })
        this.setState({
            filterPurchase: filterPurchase
        })
    };

    //Delete
    onDelete(args) {
        if (!window.confirm("确定删除？")) {
            return
        }
        Api.delete('purchase/' + args.rowId)
            .then(res => {
                console.log(res)
                this.getPurchase()
            }).catch(error => {
            alert(error)
        })
    }

    render() {
        const defaultColumnProperties = {
            resizable: true,
        };
        const columns = [
            {key: 'index', name: 'No.', editable: false, width: 50},
            {key: 'purchaseDate', name: '日期', editable: true, width: 100},
            {key: 'provider', name: '供应商', editable: true, filterable: true, width: 250},
            {key: 'product', name: '商品名', editable: true, filterable: true, width: 250},
            {key: 'quantity', name: '数量', editable: true, width: 50},
            {key: 'price_purchase', name: '单价($HKD)', editable: true, width: 120},
            {key: 'totalPrice', name: '总价($HKD)', editable: false, width: 120},
            {key: 'currentQuantity', name: '存量', editable: true, width: 50},
            {key: 'marketPrice', name: '定价($HKD)', editable: true, width: 120},
            {key: 'remark', name: 'Remark', editable: true},
            {
                key: 'delete', name: '操作', editable: false,
                events: {
                    onClick: (ev, args) => {
                        this.onDelete(args);
                    }
                }
            },
        ].map(c => ({...c, ...defaultColumnProperties}));

        if (this.props.isLoading) {
            return <p>Loading....</p>
        }

        return (
            <div>
                <h3>采购列表</h3>

                <ReactDataGrid
                    toolbar={<Toolbar enableFilter={true}/>}
                    onAddFilter={this.handleFilterChange}
                    columns={columns}
                    rowGetter={i => this.props.purchase[i]}
                    rowsCount={this.props.purchase.length}
                    enableCellSelect={true}
                    minHeight={500}
                    enableCellAutoFocus={false}
                    onGridRowsUpdated={this.onGridRowsUpdated}
                />
            </div>
        );
    }

}


export default Purchase;
