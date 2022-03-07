import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import RichTextEditor from '../../components/RichTextEditor';


const Editor = () => {
    const initialContent = "<p>This is a task description with markup support</p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p>End of air-mode area</p>";

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Forms', path: '/forms/editor' },
                            { label: 'Editor', path: '/forms/editor', active: true },
                        ]}
                        title={'Editor'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <h4 className="header-title mb-1">DraftJS Editor</h4>
                            <p className="text-muted font-14 mb-4">
                                DraftJS is a light-weight, simple, embeddable, and beautiful editor
                            </p>

                            <RichTextEditor onEditorContentChange={() => { }} initialContent={initialContent} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <h4 className="header-title mb-1">DraftJS Editor - Inline</h4>
                            <p className="text-muted font-14 mb-4">
                                An interface without the Toolbar. To reveal popover Toolbar, select a text where you want to modify. 
                                Simply specify <code>hideToolbar</code> attribute.
                            </p>

                            <RichTextEditor onEditorContentChange={() => { }} initialContent={initialContent} hideToolbar={true} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Editor;
