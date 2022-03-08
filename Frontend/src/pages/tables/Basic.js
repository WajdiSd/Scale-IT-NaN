import React from 'react';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';

import PageTitle from '../../components/PageTitle';

const records = [
    { id: 1, firstName: 'Greeva', lastName: 'N', username: '@greeva' },
    { id: 2, firstName: 'Dhyani', lastName: 'B', username: '@dhyani' },
    { id: 3, firstName: 'Manu', lastName: 'B', username: '@mannat' },
    { id: 4, firstName: 'Nik', lastName: 'N', username: '@nikn' },
    { id: 5, firstName: 'Shreyu', lastName: 'Navadiya', username: '@sn' },
];


const BasicTable = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Basic example</h4>
                <p className="sub-header">
                    Just use <code>Table</code> element
                </p>

                <Table className="mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.firstName}</td>
                                    <td>{record.lastName}</td>
                                    <td>{record.username}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};


const InverseTable = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Inverse Table</h4>
                <p className="sub-header">
                    You can also invert the colors—with light text on dark backgrounds—by specifying <code>dark</code>{' '}
                    attribute
                </p>

                <Table className="mb-0" dark>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.firstName}</td>
                                    <td>{record.lastName}</td>
                                    <td>{record.username}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

const StripedRowsTable = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Striped Rows</h4>
                <p className="sub-header">
                    Add <code>striped</code> attribute to table
                </p>

                <Table className="mb-0" striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.firstName}</td>
                                    <td>{record.lastName}</td>
                                    <td>{record.username}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

const BorderedTable = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Bordered table</h4>
                <p className="sub-header">
                    Add <code>bordered</code> attribute for borders on all sides of the table and cells.
                </p>

                <Table className="mb-0" bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.firstName}</td>
                                    <td>{record.lastName}</td>
                                    <td>{record.username}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

const HoverableTable = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Hoverable Rows</h4>
                <p className="sub-header">
                    Add <code>hover</code> attribute to enable a hover state on table rows
                </p>

                <Table className="mb-0" hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.firstName}</td>
                                    <td>{record.lastName}</td>
                                    <td>{record.username}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

const SmallTable = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Small table</h4>
                <p className="sub-header">
                    Add <code>size="sm"</code> attribute to make tables more compact by cutting cell padding in half
                </p>

                <Table className="mb-0" size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.firstName}</td>
                                    <td>{record.lastName}</td>
                                    <td>{record.username}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

const ResponsiveTable = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Responsive Table</h4>
                <p className="sub-header">
                    Across every breakpoint, use <code>responsive</code> attribute to create responsive tables
                </p>

                <Table className="mb-0" responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.firstName}</td>
                                    <td>{record.lastName}</td>
                                    <td>{record.username}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

const Tables = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Tables', path: '/tables/basic' },
                            { label: 'Basic Tables', path: '/tables/basic', active: true },
                        ]}
                        title={'Basic Tables'}
                    />
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <BasicTable />
                </Col>

                <Col xl={6}>
                    <InverseTable />
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <StripedRowsTable />
                </Col>

                <Col xl={6}>
                    <BorderedTable />
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <HoverableTable />
                </Col>

                <Col xl={6}>
                    <SmallTable />
                </Col>
            </Row>

            <Row>
                <Col>
                    <ResponsiveTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Tables;
