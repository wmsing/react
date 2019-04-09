import React, {Component} from "react";

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

class ErrorDialog extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            error: ''
        }
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        // console.log(this.state.open)
        return (<Dialog
            open={this.state.open}
            // TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">
                {"Error!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {this.state.error}
                </DialogContentText>
            </DialogContent>
        </Dialog>)
    }

}

// function Transition(props) {
//     return <Slide direction="up" {...props} />;
// }

export default ErrorDialog