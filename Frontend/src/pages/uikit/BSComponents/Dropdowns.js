import React from 'react';
import { Card, CardBody, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { ChevronDown, ChevronLeft, ChevronUp, ChevronRight } from 'react-feather';


const Dropdowns = () => {

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h5 className="header-title mb-1 mt-0">Dropdown Examples</h5>
                    <p className="sub-header">
                        The best part is you can do this with any button variant, too:
                    </p>

                    <UncontrolledDropdown className="d-inline">
                        <DropdownToggle color="primary">Dropdown <i className="icon"><ChevronDown></ChevronDown></i></DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem disabled>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <UncontrolledDropdown className="d-inline ml-2">
                        <DropdownToggle color="info">Right Menu <i className="icon"><ChevronDown></ChevronDown></i></DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem disabled>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <UncontrolledDropdown className="d-inline ml-2" direction="left">
                        <DropdownToggle color="warning"><i className="icon"><ChevronLeft></ChevronLeft></i> Drop left</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem disabled>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <UncontrolledDropdown className="d-inline ml-2" direction="right">
                        <DropdownToggle color="success">Drop right <i className="icon"><ChevronRight></ChevronRight></i></DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem disabled>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <UncontrolledDropdown className="d-inline ml-2" direction="up">
                        <DropdownToggle color="danger">Drop up <i className="icon"><ChevronUp></ChevronUp></i></DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem disabled>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <UncontrolledDropdown className="d-inline ml-2">
                        <DropdownToggle color="primary">Simple Text <i className="icon"><ChevronDown></ChevronDown></i></DropdownToggle>
                        <DropdownMenu>
                                <div className="text-muted p-2">
                                    <p>Some example text that's free-flowing within the dropdown menu.</p>
                                    <p className="mb-0">And this is more example text.</p>
                                </div>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Dropdowns;
