import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Modals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
        this.openModalWithSize = this.openModalWithSize.bind(this);
        this.openModalWithClass = this.openModalWithClass.bind(this);
    }

    /**
     * Show/hide the modal
     */
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    };

    /**
     * Opens large modal
     */
    openModalWithSize = size => {
        this.setState({ size: size, className: null });
        this.toggle();
    };

    /**
     * Opens modal with custom class
     */
    openModalWithClass = className => {
        this.setState({ className: className, size: null });
        this.toggle();
    };

    render() {
        return (
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <h4 className="mt-0 mb-1 header-title">Modals</h4>

                            <p className="sub-header">A rendered modal with header, body, and set of actions in the footer.</p>

                            <Row>
                                <Col xl={4}>
                                    <h5 className="font-size-16 mb-3">Examples</h5>
                                    <div className="button-list">
                                        <Button color="primary" onClick={this.toggle}>Standard Modal</Button>
                                    </div>
                                </Col>
                                <Col xl={4}>
                                    <h5 className="font-size-16 mb-3">Modal sizes</h5>
                                    <div className="button-list">
                                        <Button color="secondary" onClick={() => this.openModalWithSize('xl')}>Extra large Modal</Button>
                                        <Button color="success" onClick={() => this.openModalWithSize('lg')}>Large Modal</Button>
                                        <Button color="info" onClick={() => this.openModalWithSize('sm')}>Small Modal</Button>
                                    </div>
                                </Col>
                                <Col xl={4}>
                                    <h5 className="font-size-16 mb-3">Other exmaples</h5>
                                    <div className="button-list">
                                        <Button color="warning" onClick={() => this.openModalWithClass('modal-dialog-centered')}>Center</Button>
                                        <Button color="secondary" onClick={() => this.openModalWithClass('modal-dialog-scrollable')}>Scrollable Modal</Button>
                                    </div>
                                </Col>
                            </Row>


                            <Modal
                                isOpen={this.state.modal}
                                toggle={this.toggle}
                                className={this.state.className}
                                size={this.state.size}>
                                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                                <ModalBody>
                                    <h6>Text in a modal</h6>
                                    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                                    <hr />
                                    <h6>Overflowing text to show scroll behavior</h6>
                                    <p>
                                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                                    <p>
                                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                                        lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                                    <p>
                                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                                        scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                                    <p>
                                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                                    
                                    {this.state.className && this.state.className === 'modal-dialog-scrollable' && <React.Fragment><p>
                                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                                        <p>
                                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                                        lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                                        <p>
                                            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                                        scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                                        <p>
                                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                                    </React.Fragment>}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggle}>Do Something</Button>
                                    <Button color="secondary" className="ml-1" onClick={this.toggle}>Cancel</Button>
                                </ModalFooter>
                            </Modal>


                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Modals;
