import React from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

import PageTitle from '../../components/PageTitle';

import logo from '../../assets/images/logo.png';


const Invoice = () => {
    const invoiceDetail = {
        customer: 'Greeva Navadiya',
        notes: 'All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above',
        invoice_date: 'Jul 17, 2019',
        due_date: 'Jul 27, 2019',
        invoice_id: '#sh1001',
        address: {
            line_1: '795 Folsom Ave, Suite 600',
            city: 'San Francisco',
            state: 'CA',
            zip: 94107,
            phone: '(123) 456-7890',
        },
        billing_address: {
            line_1: '795 Folsom Ave, Suite 600',
            city: 'San Francisco',
            state: 'CA',
            zip: 94107,
            phone: '(123) 456-7890',
        },
        items: [
            {
                id: 1,
                name: 'Web Design',
                description: '2 Pages static website - my website',
                qty: 22,
                unit_cost: '$30.00',
                total: '$660.00',
            },
            {
                id: 2,
                name: 'Software Development',
                description: "Invoice editor software - AB'c Software",
                qty: 112.5,
                unit_cost: '$35.00',
                total: '$3937.50',
            },
        ],
        sub_total: '$4597.50',
        discount: '$459.75',
        total: '$4137.75',
    };


    return (
        <React.Fragment>
            <Row className="page-title d-print-none">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Pages', path: '/pages/invoice' },
                            { label: 'Invoice', path: '/pages/invoice', active: true },
                        ]}
                        title={'Invoice'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <div className="clearfix">
                                <div className="float-sm-right">
                                    <img src={logo} alt="" height="48" />
                                    <h4 className="m-0 d-inline align-middle">Shreyu</h4>
                                    <address className="pl-2 mt-2">
                                        {invoiceDetail.address.line_1}<br />
                                        {invoiceDetail.address.city}, {invoiceDetail.address.state} {invoiceDetail.address.zip}<br />
                                        <abbr title="Phone">P:</abbr> {invoiceDetail.address.phone}
                                    </address>
                                </div>
                                <div className="float-sm-left">
                                    <h4 className="m-0 d-print-none">Invoice</h4>
                                    <dl className="row mb-2 mt-3">
                                        <dt className="col-sm-3 font-weight-normal">Invoice Number :</dt>
                                        <dd className="col-sm-9 font-weight-normal">#sh1001</dd>

                                        <dt className="col-sm-3 font-weight-normal">Invoice Date :</dt>
                                        <dd className="col-sm-9 font-weight-normal">Jul 17, 2019</dd>

                                        <dt className="col-sm-3 font-weight-normal">Due Date :</dt>
                                        <dd className="col-sm-9 font-weight-normal">Jul 27, 2019</dd>
                                    </dl>
                                </div>
                            </div>

                            <Row className="mt-4">
                                <Col md={6}>
                                    <h6 className="font-weight-normal">Invoice For:</h6>
                                    <h6 className="font-size-16">{invoiceDetail.customer}</h6>
                                    <address>
                                        {invoiceDetail.billing_address.line_1}<br />
                                        {invoiceDetail.billing_address.city}, {invoiceDetail.billing_address.state} {invoiceDetail.billing_address.zip}<br />
                                        <abbr title="Phone">P:</abbr> {invoiceDetail.billing_address.phone}
                                    </address>
                                </Col>

                                <Col md={6}>
                                    <div className="text-md-right">
                                        <h6 className="font-weight-normal">Total</h6>
                                        <h2>{invoiceDetail.total}</h2>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className="table-responsive">
                                        <table className="table mt-4 table-centered">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Item</th>
                                                    <th>Hours</th>
                                                    <th>Hours Rate</th>
                                                    <th className="text-right">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoiceDetail.items.map((item, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <td>{idx + 1}</td>
                                                            <td>
                                                                <h5 className="font-size-16 mt-0 mb-2">{item.name}</h5>
                                                                <p className="text-muted mb-0">{item.description}</p>
                                                            </td>
                                                            <td>{item.qty}</td>
                                                            <td>{item.unit_cost}</td>
                                                            <td className="text-right">{item.total}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <div className="clearfix pt-5">
                                        <h6 className="text-muted">Notes:</h6>

                                        <small className="text-muted">
                                            {invoiceDetail.notes}
                                        </small>
                                    </div>
                                </Col>

                                <Col sm={6}>
                                    <div className="float-right mt-4">
                                        <p><span className="font-weight-medium">Sub-total:</span> <span
                                            className="float-right">{invoiceDetail.sub_total}</span></p>
                                        <p><span className="font-weight-medium">Discount (10%):</span> <span
                                            className="float-right"> &nbsp;&nbsp;&nbsp; {invoiceDetail.discount}</span></p>
                                        <h3>{invoiceDetail.total} USD</h3>
                                    </div>
                                    <div className="clearfix"></div>
                                </Col>
                            </Row>

                            <div className="mt-5 mb-1">
                                <div className="text-right d-print-none">
                                    <Button color="primary" onClick={e => {
                                        window.print();
                                    }}>
                                        <i className="uil uil-print mr-1"></i> Print
                                    </Button>
                                    <a href="/" className="btn btn-info ml-1">Submit</a>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Invoice;
