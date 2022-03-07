import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ButtonGroup,
    UncontrolledTooltip,
    Media,
} from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import RichTextEditor from '../../../components/RichTextEditor';

import avatarImg from '../../../assets/images/users/avatar-2.jpg';
import avatar7Img from '../../../assets/images/users/avatar-7.jpg';
import LeftSide from './LeftSide';
import { emails } from './Data';


// EmailDetail
class EmailDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalUnreadEmails: emails.filter(e => e.is_read === false).length,
            email: {
                avatar: avatarImg,
                subject: 'Your elite author Graphic Optimization reward is ready!',
                from_name: 'Steven Smith',
                from_email: 'jonathan@domain.com',
                recieved_on: 'Jul 24, 2019, 5:17 AM',
                attachments: [
                    { id: 1, name: 'Hyper-admin-design.zip', size: '2.3MB', ext: '.zip' },
                    { id: 2, name: 'Dashboard-design.jpg', size: '0.3MB', ext: '.jpg' },
                    { id: 3, name: 'Admin-bug-report.mp4', size: '4.1MB', ext: '.mp4' },
                ],
            },
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
                                { label: 'Apps', path: '/apps/email/details' },
                                { label: 'Email', path: '/apps/email/details' },
                                { label: 'Email Read', path: '/apps/email/details', active: true },
                            ]}
                            title={'Email Read'}
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
                                <ButtonGroup className="mr-1">
                                    <Button id="archive" color="light">
                                        <i className="uil uil-archive-alt"></i>
                                    </Button>
                                    <UncontrolledTooltip placement="top" target="archive">Archived</UncontrolledTooltip>
                                    <Button id="spam" color="light">
                                        <i className="uil uil-exclamation-octagon"></i>
                                    </Button>
                                    <UncontrolledTooltip placement="top" target="spam">Mark as spam</UncontrolledTooltip>
                                    <Button id="delete" color="light">
                                        <i className="uil uil-trash-alt"></i>
                                    </Button>
                                    <UncontrolledTooltip placement="top" target="delete">Delete</UncontrolledTooltip>
                                </ButtonGroup>

                                <UncontrolledDropdown className="d-inline-block mr-1" id="move-folder">
                                    <DropdownToggle className="btn btn-light">
                                        <i className="uil uil-folder"></i>
                                        <i className="uil uil-angle-down"></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <span className="dropdown-header">Move to</span>
                                        <DropdownItem>Social</DropdownItem>
                                        <DropdownItem>Promotions</DropdownItem>
                                        <DropdownItem>Updates</DropdownItem>
                                        <DropdownItem>Forums</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledTooltip placement="top" target="move-folder">Folder</UncontrolledTooltip>

                                <UncontrolledDropdown className="d-inline-block mr-1" id="mark-label">
                                    <DropdownToggle className="btn btn-light">
                                        <i className="uil uil-label"></i>
                                        <i className="uil uil-angle-down"></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <span className="dropdown-header">Label as</span>
                                        <DropdownItem>Updates</DropdownItem>
                                        <DropdownItem>Social</DropdownItem>
                                        <DropdownItem>Promotions</DropdownItem>
                                        <DropdownItem>Forums</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledTooltip placement="top" target="mark-label">Labels</UncontrolledTooltip>

                                <UncontrolledDropdown className="d-inline-block mr-1 my-1" id="more-actions">
                                    <DropdownToggle className="btn btn-light">
                                        <i className="uil uil-ellipsis-h font-size-13"></i> More
                                        <i className="uil uil-angle-down ml-1"></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <span className="dropdown-header">More Options</span>
                                        <DropdownItem>Mark as Unread</DropdownItem>
                                        <DropdownItem>Add to Tasks</DropdownItem>
                                        <DropdownItem>Add Star</DropdownItem>
                                        <DropdownItem>Mute</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledTooltip placement="top" target="more-actions">More Actions</UncontrolledTooltip>

                                <div className="mt-3">
                                    <h5>{this.state.email.subject}</h5>
                                    <hr />

                                    <Media className="mb-4 mt-1">
                                        <img className="d-flex mr-2 rounded-circle avatar-sm"
                                            src={this.state.email.avatar}
                                            alt={this.state.email.from_name} />
                                        <Media body>
                                            <span className="float-right">{this.state.email.recieved_on}</span>
                                            <h6 className="m-0 font-14">{this.state.email.from_name}</h6>
                                            <small className="text-muted">From: {this.state.email.from_email}</small>
                                        </Media>
                                    </Media>

                                    <p><b>Hi Coderthemes...</b></p>
                                    <div className="text-muted">
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                                            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                                            penatibus et magnis dis parturient montes, nascetur ridiculus
                                            mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                                                quis, sem.</p>
                                        <p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
                                            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                                            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
                                            mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
                                                elementum semper nisi.</p>
                                        <p>Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor
                                            eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                                            dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                                            nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                                            Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies
                                            nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget
                                            condimentum rhoncus, sem quam semper libero, sit amet adipiscing
                                            sem neque sed ipsum. Nam quam nunc, blandit vel, luctus
                                                pulvinar,</p>
                                    </div>

                                    <hr />

                                    <h6><i className='uil uil-paperclip mb-2'></i> Attachments <span>(3)</span></h6>

                                    <Row>
                                        {this.state.email.attachments.map((f, idx) => {
                                            return (
                                                <Col xl={4} md={6} key={idx}>
                                                    <Card className="p-2 border rounded mb-2">
                                                        <Media>
                                                            <div className="avatar-sm font-weight-bold mr-3">
                                                                <span className="avatar-title rounded bg-soft-primary text-primary">
                                                                    <i className="uil-file-plus-alt font-size-18"></i>
                                                                </span>
                                                            </div>
                                                            <Media body>
                                                                <a href="/" className="d-inline-block mt-2 text-muted font-weight-bold">{f.name}</a>
                                                            </Media>
                                                            <div className="float-right mt-1">
                                                                <a href="/" className="p-2"><i className="uil-download-alt font-size-18"></i></a>
                                                            </div>
                                                        </Media>
                                                    </Card>
                                                </Col>
                                            )
                                        })}
                                    </Row>

                                    <Media className="mb-0 mt-5">
                                        <img className="d-flex mr-3 rounded-circle avatar-sm" src={avatar7Img} alt="" />
                                        <Media body>
                                            <div className="mb-2">
                                                <AvForm onValidSubmit={this.handleSave}>
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
                                        </Media>
                                    </Media>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default EmailDetail;
