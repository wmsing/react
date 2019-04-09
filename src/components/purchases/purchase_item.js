// import React, {Component} from 'react';
// import TableRow from '@material-ui/core/TableRow';
// import TableCell from '@material-ui/core/TableCell';
// import Moment from 'react-moment';
// import Button from '@material-ui/core/Button';
// import Api from "../api/api";
// import TextField from '@material-ui/core/TextField';
//
// class PurchaseItem extends Component {
//     state = {
//         remark: this.props.purchase.remark,
//         purchaseId: '',
//         marketPrice: this.props.purchase.marketPrice,
//         currentQuantity: this.props.purchase.currentQuantity,
//     }
//
//     //Delete
//     deletePurchase = (purchaseId) => {
//         console.log(purchaseId)
//         Api.delete('purchase/' + purchaseId)
//             .then(res => {
//                 console.log(res)
//                 window.location.reload()
//             })
//             .catch(error => {
//                 console.log('e: ' + error)
//                 // window.location.reload()
//             })
//     }
//
//
//     ///////////////////////////////////////////////////////
//     /// TITLE:- Update
//     //////////////////////////////////////////////////////
//     onRemarkPress = (e) => {
//         if (e.key === 'Enter') {
//             Api.patch('purchase/' + this.state.purchaseId, {
//                 products: {remark: this.state.remark}
//             }).then((res) => {
//                 console.log(res)
//                 window.location.reload()
//             }).catch(error => {
//                 alert(error)
//             })
//         }
//     }
//
//     onMarketPricePress = (e) => {
//         if (e.key === 'Enter') {
//             Api.patch('purchase/' + this.state.purchaseId, {
//                 products: {marketPrice: this.state.marketPrice}
//             }).then((res) => {
//                 console.log(res)
//                 window.location.reload()
//             }).catch(error => {
//                 alert(error)
//             })
//         }
//     }
//
//     onCurrentQuantityPress = (e) => {
//         if (e.key === 'Enter') {
//             Api.patch('purchase/' + this.state.purchaseId, {
//                 products: {currentQuantity: this.state.currentQuantity}
//             }).then((res) => {
//                 console.log(res)
//                 window.location.reload()
//             }).catch(error => {
//                 alert(error)
//             })
//         }
//     }
//
//     render() {
//         // console.log(this.props)
//         return (
//             <TableRow key={this.props.purchase.id}>
//                 <TableCell>
//                     <Moment format="YYYY/MM/DD">
//                         {this.props.purchase.purchaseDate}
//                     </Moment>
//                 </TableCell>
//                 <TableCell>{this.props.purchase.product.provider.name} </TableCell>
//                 <TableCell>{this.props.purchase.product.name} </TableCell>
//                 <TableCell>{this.props.purchase.product.quantity}</TableCell>
//                 <TableCell>{this.props.purchase.product.price_purchase}</TableCell>
//                 <TableCell>{this.props.purchase.product.quantity * this.props.purchase.product.price_purchase}</TableCell>
//                 <TableCell>
//                     <TextField
//                         type="text"
//                         value={this.state.currentQuantity}
//                         onChange={(e) => {
//                             this.setState({purchaseId: this.props.purchase.id, currentQuantity: e.target.value})
//                         }}
//                         onKeyPress={this.onCurrentQuantityPress}
//                         margin="normal"
//                     /></TableCell>
//                 <TableCell>
//                     <TextField
//                         type="text"
//                         value={this.state.marketPrice}
//                         onChange={(e) => {
//                             this.setState({purchaseId: this.props.purchase.id, marketPrice: e.target.value})
//                         }}
//                         onKeyPress={this.onMarketPricePress}
//                         margin="normal"
//                     />
//                 </TableCell>
//
//                 <TableCell>
//                     <TextField
//                         type="text"
//                         placeholder="Remark"
//                         value={this.state.remark}
//                         onChange={(e) => {
//                             this.setState({purchaseId: this.props.purchase.id, remark: e.target.value})
//                         }}
//                         onKeyPress={this.onRemarkPress}
//                         margin="normal"
//                     />
//                 </TableCell>
//                 <TableCell>
//                     {/*<Button size="small" variant="contained" color="primary" onClick={this.updatePurchase}>*/}
//                     {/*编辑*/}
//                     {/*</Button>*/}
//                     <Button size="small" variant="contained" color="secondary"
//                             onClick={this.deletePurchase.bind(this, this.props.purchase.id)}>
//                         Delete
//                     </Button>
//
//                 </TableCell>
//             </TableRow>
//         )
//     }
// }
//
// export default PurchaseItem;
