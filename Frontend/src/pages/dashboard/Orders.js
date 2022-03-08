import React from 'react';
import { Card, CardBody, Table, Button } from 'reactstrap';

const Orders = () => {
    return (
        <Card>
            <CardBody className="pb-0">
                <Button className="float-right" size={'sm'} color="primary">
                    <i className='uil uil-export ml-1'></i> Export
                </Button>

                <h5 className="card-title mt-0 mb-0 header-title">Recent Orders</h5>

                <Table hover responsive className="mt-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#98754</td>
                            <td>ASOS Ridley High</td>
                            <td>Otto B</td>
                            <td>$79.49</td>
                            <td><span className="badge badge-soft-warning py-1">Pending</span></td>
                        </tr>
                        <tr>
                            <td>#98753</td>
                            <td>Marco Lightweight Shirt</td>
                            <td>Mark P</td>
                            <td>$125.49</td>
                            <td><span className="badge badge-soft-success py-1">Delivered</span>
                            </td>
                        </tr>
                        <tr>
                            <td>#98752</td>
                            <td>Half Sleeve Shirt</td>
                            <td>Dave B</td>
                            <td>$35.49</td>
                            <td><span className="badge badge-soft-danger py-1">Declined</span>
                            </td>
                        </tr>
                        <tr>
                            <td>#98751</td>
                            <td>Lightweight Jacket</td>
                            <td>Shreyu N</td>
                            <td>$49.49</td>
                            <td><span className="badge badge-soft-success py-1">Delivered</span>
                            </td>
                        </tr>
                        <tr>
                            <td>#98750</td>
                            <td>Marco Shoes</td>
                            <td>Rik N</td>
                            <td>$69.49</td>
                            <td><span className="badge badge-soft-danger py-1">Declined</span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default Orders;
