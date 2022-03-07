import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import FileUploader from '../../components/FileUploader';

const FileUpload = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Forms', path: '/forms/upload' },
                            { label: 'File Upload', path: '/forms/upload', active: true },
                        ]}
                        title={'File Upload'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <h4 className="header-title mt-0 mb-1">Dropzone File Upload</h4>
                            <p className="sub-header">DropzoneJS is an open source library that provides drag and drop file uploads with image previews.</p>

                            <FileUploader
                                onFileUpload={files => {
                                    console.log(files);
                                }}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default FileUpload;
