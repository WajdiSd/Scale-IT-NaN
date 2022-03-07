import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import RichTextEditor from '../../../components/RichTextEditor';

import LeftSide from './LeftSide';
import { emails } from './Data';


// Compose
class Compose extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalUnreadEmails: emails.filter(e => e.is_read === false).length,
            newReplyContent: null
        };
        this.onEditorContentChange = this.onEditorContentChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    /**
     * On onEditorContentChange
     */
    onEditorContentChange = editorContent => {
        this.setState({newReplyContent: editorContent});
    }

    /**
     * Handles the save
     * @param {*} event 
     * @param {*} values 
     */
    handleSave(event, values) {
        console.log(values, this.state.newReplyContent);
    }

    render() {
        
        return (
            <React.Fragment>
                <Row className="page-title">
                    <Col md={12}>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Apps', path: '/apps/email/compose' },
                                { label: 'Email', path: '/apps/email/compose' },
                                { label: 'Compose', path: '/apps/email/compose', active: true },
                            ]}
                            title={'Compose Email'}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col className="col-12">
                        <div className="email-container">
                            <Card className="inbox-leftbar">
                                <LeftSide totalUnreadEmails={this.state.totalUnreadEmails} />
                            </Card>

                            <div className="inbox-rightbar p-4">
                                <AvForm onValidSubmit={this.handleSave}>
                                    <AvField type="email" name="to" placeholder="To" label="To" required></AvField>
                                    <AvField type="text" name="subject" label="Subject" placeholder="Subject" required></AvField>

                                    <Row>
                                        <Col>
                                            <RichTextEditor onEditorContentChange={this.onEditorContentChange} />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3 text-right">
                                        <Col>
                                            <Button color="primary">Send<i className='uil uil-message ml-2'></i></Button>
                                        </Col>
                                    </Row>
                                </AvForm>
                            </div>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Compose;
