import React from 'react';
import { Row, Col, Card, CardBody, Button, ButtonGroup, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';


const Buttons = () => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link'];

    return (
        <React.Fragment>
            <Row>
                <Col xl={6}>
                    <Card>
                        <CardBody>
                            <h5 className="header-title mb-1 mt-0">Buttons</h5>
                            <p className="sub-header">Use the button classes on an
                                                <code>&lt;a&gt;</code>, <code>&lt;button&gt;</code>, or
                                                <code>&lt;input&gt;</code> element.</p>

                            <div className="button-list">
                                {colors.map((color, index) => {
                                    return (
                                        <Button color={color} key={index}>{color}</Button>
                                    );
                                })}
                            </div>

                            <div className="mt-4 pt-1">
                                <h5 className="font-size-16 mb-1 mt-0">Outline Buttons</h5>
                                <p className="sub-header">Use a classes <code>.btn-outline-**</code> to quickly create a bordered buttons.</p>

                                <div className="button-list">
                                    {colors.map((color, index) => {
                                        return (
                                            <Button color={`outline-${color}`} key={index}>{color}</Button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-4 pt-1">
                                <h5 className="font-size-16 mb-1 mt-0">Soft Buttons</h5>
                                <p className="sub-header">Use a classes <code>.btn-soft-**</code> to quickly create a bordered buttons.</p>

                                <div className="button-list">
                                    {colors.map((color, index) => {
                                        return (
                                            <Button color={`soft-${color}`} key={index}>{color}</Button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-4 pt-1">
                                <h5 className="font-size-16 mb-1 mt-0">Rounded Buttons</h5>
                                <p className="sub-header">Use a classes <code>.btn-**</code> with <code>btn-rounded</code> to quickly create a bordered buttons.</p>

                                <div className="button-list">
                                    {colors.map((color, index) => {
                                        return (
                                            <Button color={color} className="btn-rounded" key={index}>{color}</Button>
                                        );
                                    })}
                                </div>
                            </div>

                        </CardBody>
                    </Card>
                </Col>

                <Col xl={6}>
                    <Card>
                        <CardBody>
                            <h5 className="font-size-16 mb-1 mt-0">Button Width</h5>

                            <p className="sub-header">
                                Create buttons with minimum width by adding class
                                                <code>.width-xs</code>, <code>.width-sm</code>,
                                                <code>.width-md</code> or <code>.width-lg</code>
                            </p>

                            <div className="button-list">
                                <Button color="primary" className="width-xs">Xs</Button>
                                <Button color="primary" className="width-sm">Small</Button>
                                <Button color="primary" className="width-md">Middle</Button>
                                <Button color="primary" className="width-lg">Large</Button>
                            </div>

                            <div className="mt-4 pt-1">
                                <h5 className="font-size-16 mb-1 mt-0">Button Sizes</h5>
                                <p className="sub-header">
                                    Different sizes with property <code>size</code> with values <code>sm</code> or <code>lg</code>
                                </p>

                                <div className="button-list">
                                    <Button color="primary" size="lg">Large</Button>
                                    <Button color="primary">Normal</Button>
                                    <Button color="primary" size="sm">Small</Button>
                                    <Button color="primary" className="btn-block">Block Button</Button>
                                </div>
                            </div>

                            <div className="mt-4 pt-1">
                                <h5 className="font-size-16 mb-1 mt-0">Button Group</h5>
                                <p className="sub-header">
                                    Wrap a series of buttons with <code>ButtonGroup</code>
                                </p>

                                <Row>
                                    <Col md={6}>
                                        <ButtonGroup>
                                            <Button color="info">Left</Button>
                                            <Button color="info">Middle</Button>
                                            <Button color="info">Right</Button>
                                        </ButtonGroup>

                                        <br />

                                        <ButtonGroup className="mt-2 mb-2 mr-1">
                                            <Button color="primary">1</Button>
                                            <Button color="primary">2</Button>
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle color="primary">Dropdown <i className="uil uil-angle-down"></i></DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>Dropdown Link</DropdownItem>
                                                    <DropdownItem>Dropdown Link</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </ButtonGroup>
                                    </Col>
                                    <Col md={6}>
                                        <ButtonGroup vertical>
                                            <Button color="primary">1</Button>
                                            <Button color="primary">2</Button>
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle color="primary">Dropdown <i className="uil uil-angle-down"></i></DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>Dropdown Link</DropdownItem>
                                                    <DropdownItem>Dropdown Link</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Buttons;
