import React, { Component } from 'react';
import { Card, CardBody, Collapse, CardHeader, NavLink } from 'reactstrap';


class Accordions extends Component {

    constructor(props) {
        super(props);

        this.togglePanel = this.togglePanel.bind(this);
        this.state = { panel1: true, panel2: false, panel3: false };
    }

    /**
     * Toggle panel
     */
    togglePanel(panel) {
        var state = { ...this.state };
        state[panel] = !state[panel];
        this.setState(state);
    }

    render() {

        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h5 className="header-title mb-3 mt-0">Accordions Example</h5>

                        <div id="accordion" className="accordion custom-accordionwitharrow">
                            <Card className="mb-1 shadow-none border">
                                <NavLink className="text-dark" id="group1" href="#" onClick={() => { this.togglePanel('panel1') }}>
                                    <CardHeader className="p-1">
                                        <h5 className="m-0 font-size-16">
                                            What is Lorem Ipsum? 
                                            {this.state.panel1 && <i className='uil uil-angle-down float-right accordion-arrow'></i>}
                                            {!this.state.panel1 && <i className='uil uil-angle-up float-right accordion-arrow'></i>}
                                        </h5>
                                    </CardHeader>
                                </NavLink>

                                <Collapse isOpen={this.state.panel1}>
                                    <CardBody>
                                        This is first collapse content
                                </CardBody>
                                </Collapse>
                            </Card>

                            <Card className="mb-1 shadow-none border">
                                <NavLink className="text-dark" id="group2" href="#" onClick={() => { this.togglePanel('panel2') }}>
                                    <CardHeader className="p-1">
                                        <h5 className="m-0 font-size-16">
                                            Why do we use it? 
                                            {this.state.panel2 && <i className='uil uil-angle-down float-right accordion-arrow'></i>}
                                            {!this.state.panel2 && <i className='uil uil-angle-up float-right accordion-arrow'></i>}
                                        </h5>
                                    </CardHeader>
                                </NavLink>
                                <Collapse isOpen={this.state.panel2}>
                                    <CardBody>This is second collapse content</CardBody>
                                </Collapse>
                            </Card>

                            <Card className="mb-1 shadow-none border">
                                <NavLink className="text-dark" id="group3" href="#" onClick={() => { this.togglePanel('panel3') }}>
                                    <CardHeader className="p-1">
                                        <h5 className="m-0 font-size-16">
                                            Where does it come from? 
                                            {this.state.panel3 && <i className='uil uil-angle-down float-right accordion-arrow'></i>}
                                            {!this.state.panel3 && <i className='uil uil-angle-up float-right accordion-arrow'></i>}
                                        </h5>
                                    </CardHeader>
                                </NavLink>
                                <Collapse isOpen={this.state.panel3}>
                                    <CardBody>This is third collapse content</CardBody>
                                </Collapse>
                            </Card>
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
};

export default Accordions;
