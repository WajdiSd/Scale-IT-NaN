import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Row, Col, Card, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup,
    UncontrolledTooltip, Media, UncontrolledButtonDropdown
} from 'reactstrap';
import classNames from 'classnames';

import PageTitle from '../../../components/PageTitle';

import avatarImg2 from '../../../assets/images/users/avatar-2.jpg';
import avatarImg3 from '../../../assets/images/users/avatar-3.jpg';
import avatarImg4 from '../../../assets/images/users/avatar-4.jpg';
import avatarImg5 from '../../../assets/images/users/avatar-5.jpg';
import avatarImg6 from '../../../assets/images/users/avatar-6.jpg';

import LeftSide from './LeftSide';
import { emails } from './Data';


const ChatProfileUser = props => {
    return (
        <React.Fragment>
            <div className="mt-4 border-bottom pb-2 mb-2">
                <Media>
                    <div className="mr-2">
                        <div className="avatar-sm font-weight-bold d-inline-block m-1">
                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">S</span>
                        </div>
                    </div>
                    <Media body className="overflow-hidden">
                        <h5 className="font-size-14 mt-1 mb-0">Shreyu</h5>
                        <small className="text-muted"><i className="uil uil-circle font-size-11 text-success"></i> Active Now</small>
                    </Media>
                    <UncontrolledButtonDropdown className="float-right mt-2">
                        <DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle arrow-none">
                            <i className="uil uil-ellipsis-v text-muted font-size-12"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Edit</DropdownItem>
                            <DropdownItem>Delete</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </Media>
            </div>
        </React.Fragment>
    )
}

const ChatUser = props => {
    return <React.Fragment>
        <Media>
            <div className="text-center mr-3">
                <img src={props.image} alt=""
                    className="avatar-sm rounded-circle" />
            </div>
            <Media body className="overflow-hidden">
                <h5 className="font-size-15 mt-0 mb-1">{props.name}</h5>
                <p className="text-muted font-size-13 text-truncate mb-0">{props.description}</p>
            </Media>
        </Media>
    </React.Fragment>
}


const ChatUserList = props => {
    return (
        <React.Fragment>
            <ul className="list-unstyled">
                <li className="py-2">
                    <ChatUser name="Johnny" description="I wisht the world become so.." image={avatarImg2} />
                </li>
                <li className="py-2">
                    <ChatUser name="Bryan" description="For science, music, sport, etc" image={avatarImg3} />
                </li>
                <li className="py-2">
                    <ChatUser name="Tracy" description="To an English person, it will seem like simplified" image={avatarImg4} />
                </li>
                <li className="py-2">
                    <ChatUser name="Thomas" description="To achieve this, it would be necessary" image={avatarImg5} />
                </li>
                <li className="py-2">
                    <ChatUser name="David" description="If several languages coalesce" image={avatarImg6} />
                </li>
            </ul>
        </React.Fragment>
    )
}


// emails list
const EmailsList = props => {
    const emails = props.emails || [];

    return (
        <React.Fragment>
            <ul className="message-list">
                {emails.map((email, idx) => {
                    return (
                        <li className={classNames({ unread: !email.is_read })} key={idx}>
                            <div className="col-mail col-mail-1">
                                <div className="checkbox-wrapper-mail">
                                    <input type="checkbox" className="" id={'mail' + email.id} />
                                    <label className="" htmlFor={'mail' + email.id}></label>
                                </div>
                                <span
                                    className={classNames('star-toggle', 'uil', 'uil-star', {
                                        'text-warning': email.is_important,
                                    })}></span>
                                <Link to="/apps/email/details" className="title">
                                    {email.from_name}
                                    {email.number_of_reply > 1 && <span> ({email.number_of_reply})</span>}
                                </Link>
                            </div>
                            <div className="col-mail col-mail-2">
                                <Link to="/apps/email/details" className="subject">
                                    {email.subject}
                                </Link>
                                <div className="date">{email.time}</div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </React.Fragment>
    );
};

// Inbox
class Inbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emails: emails.slice(0, 20),
            totalEmails: emails.length,
            pageSize: 20,
            page: 1,
            startIndex: 1,
            endIndex: 20,
            totalPages: emails.length / 20,
            totalUnreadEmails: emails.filter(e => e.is_read === false).length,
            unreadEmails: emails.filter(e => e.is_read === false).slice(1, 4),
            importantEmails: emails.filter(e => e.is_important === true).slice(1, 5),
            otherEmails: emails.filter(e => e.is_important !== true && e.is_read === false).slice(1, 12),
        };
        this.getNextPage = this.getNextPage.bind(this);
        this.getPrevPage = this.getPrevPage.bind(this);
        this.showAllEmails = this.showAllEmails.bind(this);
        this.showStarredEmails = this.showStarredEmails.bind(this);
    }

    /**
     * Gets the next page
     */
    getNextPage = () => {
        var nextPage = this.state.page + 1;
        if (nextPage > this.state.totalEmails / this.state.pageSize) {
            nextPage = this.state.totalEmails / this.state.pageSize;
        }
        var startIdx = nextPage * this.state.pageSize - this.state.pageSize + 1;
        var endIdx = nextPage * this.state.pageSize;
        this.setState({
            page: nextPage,
            startIndex: startIdx,
            endIndex: endIdx,
            emails: emails.slice(startIdx, endIdx),
        });
    };

    /**
     * Gets the prev page
     */
    getPrevPage = () => {
        var page = this.state.page - 1;
        if (page === 0) page = 1;
        var startIdx = page * this.state.pageSize - this.state.pageSize + 1;
        var endIdx = page * this.state.pageSize;
        this.setState({ page: page, startIndex: startIdx, endIndex: endIdx, emails: emails.slice(startIdx, endIdx) });
    };

    /**
     * Shows the starred emails only
     */
    showAllEmails = () => {
        this.setState({ emails: emails.slice(0, 20) });
    };

    /**
     * Shows the starred emails only
     */
    showStarredEmails = () => {
        this.setState({ emails: emails.filter(e => e.is_important).slice(0, 20) });
    };

    render() {
        return (
            <React.Fragment>
                <Row className="page-title">
                    <Col md={12}>
                        <PageTitle
                            breadCrumbItems={[
                                { label: 'Apps', path: '/apps/email/inbox' },
                                { label: 'Email', path: '/apps/email/inbox' },
                                { label: 'Inbox', path: '/apps/email/inbox', active: true },
                            ]}
                            title={'Email Inbox'}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col className="col-12">
                        <div className="email-container bg-transparent">
                            <Card className="inbox-leftbar">
                                <LeftSide
                                    totalUnreadEmails={this.state.totalUnreadEmails}
                                    showAllEmails={this.showAllEmails}
                                    showStarredEmails={this.showStarredEmails}
                                    toggleComposeModal={this.toggleComposeModal}
                                />
                                <ChatProfileUser />
                                <ChatUserList />
                            </Card>

                            <div className="inbox-rightbar">
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

                                { /* pagination */}
                                <div className="d-inline-block align-middle float-lg-right">
                                    <Row>
                                        <Col sm={9} className="align-self-center">
                                            Showing {this.state.startIndex} - {this.state.endIndex} of{' '}
                                            {this.state.totalEmails}
                                        </Col>
                                        <Col sm={3}>
                                            <ButtonGroup className="float-right">
                                                {this.state.page === 1 ? (
                                                    <Button color="white" className="btn-sm" disabled>
                                                        <i className="uil uil-angle-left"></i>
                                                    </Button>
                                                ) : (
                                                        <Button color="primary" className="btn-sm" onClick={this.getPrevPage}>
                                                            <i className="uil uil-angle-left"></i>
                                                        </Button>
                                                    )}

                                                {this.state.page < this.state.totalPages ? (
                                                    <Button color="primary" className="btn-sm" onClick={this.getNextPage}>
                                                        <i className="uil uil-angle-right"></i>
                                                    </Button>
                                                ) : (
                                                        <Button color="white" className="btn-sm" disabled>
                                                            <i className="uil uil-angle-right"></i>
                                                        </Button>
                                                    )}
                                            </ButtonGroup>
                                        </Col>
                                    </Row>
                                </div>

                                {/* email list */}
                                <div className="mt-2">
                                    <h5 className="mt-3 mb-2 font-size-16">Unread</h5>
                                    <EmailsList emails={this.state.unreadEmails} />

                                    <h5 className="mt-4 mb-2 font-size-16">Important</h5>
                                    <EmailsList emails={this.state.importantEmails} />

                                    <h5 className="mt-4 mb-2 font-size-16">Everything Else</h5>
                                    <EmailsList emails={this.state.otherEmails} />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Inbox;
