import React from 'react';

import { Row, Col, Card, CardBody } from 'reactstrap';
import Select from 'react-select';
import MaskedInput from 'react-text-mask';
import Flatpickr from 'react-flatpickr'

import PageTitle from '../../components/PageTitle';


const ReactSelect = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">React Select <a href="https://github.com/JedWatson/react-select" className="ml-2 font-size-13"><i className='uil uil-external-link-alt'></i></a></h4>
                <Row>
                    <Col xl={6}>
                        <p className="mb-1 mt-3 font-weight-bold">Single Selection</p>
                        <p className="text-muted font-size-14">React-Select based Select element</p>
                        <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            options={[
                                { value: 'chocolate', label: 'Chocolate' },
                                { value: 'strawberry', label: 'Strawberry' },
                                { value: 'vanilla', label: 'Vanilla' },
                            ]}></Select>
                    </Col>
                    <Col xl={6}>
                        <p className="mb-1 mt-3 font-weight-bold">Multiple Selection</p>
                        <p className="text-muted font-size-14">React-Select based Select (Multiple) element</p>
                        <Select
                            isMulti={true}
                            options={[
                                { value: 'chocolate', label: 'Chocolate' },
                                { value: 'strawberry', label: 'Strawberry' },
                                { value: 'vanilla', label: 'Vanilla' },
                            ]}
                            className="react-select"
                            classNamePrefix="react-select"></Select>
                    </Col>
                </Row>
                
            </CardBody>
        </Card>
    );
};


const DatePickers = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Date &amp; Time Picker</h4>
                <p className="text-muted font-size-14">
                    A simple date picker using <a href="https://flatpickr.js.org/">Flatpickr</a>
                </p>

                <Row>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>Basic Date</label> <br />
                            <div className="form-group mb-sm-0 mr-2">
                                <Flatpickr value={new Date()}
                                    onChange={date => { console.log(date) }}
                                    className="form-control" />
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>Date &amp; Time</label> <br />
                            <Flatpickr value={new Date()} options={{enableTime: true}}
                                onChange={date => { console.log(date) }}
                                className="form-control" />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>Human-friendly Dates</label> <br />
                            <Flatpickr value={new Date()} options={{altInput: true, altFormat: "F j, Y", dateFormat: "Y-m-d"}}
                                    onChange={date => { console.log(date) }}
                                    className="form-control" />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>MinDate and MaxDate</label> <br />
                            <Flatpickr value={new Date()} options={{minDate: "today", maxDate: new Date().fp_incr(14)}}
                                onChange={date => { console.log(date) }}
                                className="form-control" />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>Selecting multiple dates</label> <br />
                            <Flatpickr value={new Date()} options={{mode: "multiple", dateFormat: "Y-m-d"}}
                                onChange={date => { console.log(date) }}
                                className="form-control" />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>Date Range</label> <br />
                            <Flatpickr value={new Date()} options={{mode: "range"}}
                                    onChange={date => { console.log(date) }}
                                    className="form-control" />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>Basic Time</label> <br />
                            <Flatpickr value={new Date()} options={{enableTime: true, noCalendar: true, dateFormat: "H:i"}}
                                onChange={date => { console.log(date) }}
                                className="form-control" />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>24-hour Time Picker</label> <br />
                            <Flatpickr value={new Date()}  options={{enableTime: true, noCalendar: true, dateFormat: "H:i",  time_24hr: true}}
                                    onChange={date => { console.log(date) }}
                                    className="form-control" />
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

const InputMasks = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Input Masks</h4>
                <p className="text-muted">
                    Input masks by{' '}
                    <a href="https://github.com/text-mask/text-mask/tree/master/react#readme">react-text-mask</a>
                </p>

                <Row>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>Phone Number with Area Code</label> <br />
                            <MaskedInput
                                mask={[
                                    '(',
                                    /[1-9]/,
                                    /\d/,
                                    ')',
                                    ' ',
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    '-',
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                ]}
                                placeholder="(__) ____-____"
                                className="form-control"
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>US Phone Number</label> <br />
                            <MaskedInput
                                mask={[
                                    '(',
                                    /[1-9]/,
                                    /\d/,
                                    /\d/,
                                    ')',
                                    ' ',
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    '-',
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                ]}
                                placeholder="(___) ___-____"
                                className="form-control"
                            />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>Date</label> <br />
                            <MaskedInput
                                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                placeholder="__/__/____"
                                className="form-control"
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="form-group">
                            <label>Time</label> <br />
                            <MaskedInput
                                mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
                                placeholder="__:__:__"
                                className="form-control"
                            />
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

const FormAdvanced = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Forms', path: '/forms/advanced' },
                            { label: 'Form Advanced', path: '/forms/advanced', active: true },
                        ]}
                        title={'Form Advanced'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <ReactSelect />
                </Col>
            </Row>

            <Row>
                <Col>
                    <DatePickers />
                </Col>
            </Row>

            <Row>
                <Col>
                    <InputMasks />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default FormAdvanced;
